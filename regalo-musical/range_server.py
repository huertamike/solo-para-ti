import os
import re
import sys
import http.server
import socketserver

class RangeRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        f = None
        if os.path.isdir(path):
            parts = self.path.split('/')
            parts = filter(None, parts)
            for index in ("index.html", "index.htm"):
                index = os.path.join(path, index)
                if os.path.exists(index):
                    path = index
                    break
            else:
                return super().send_head()
        
        ctype = self.guess_type(path)
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        range_header = self.headers.get('Range')
        if not range_header:
            return super().send_head()
        
        match = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not match:
            self.send_error(400, "Bad Request (invalid range)")
            f.close()
            return None
        
        start = int(match.group(1))
        end = match.group(2)
        
        try:
            fs = os.fstat(f.fileno())
            file_len = fs[6]
        except Exception:
            f.close()
            return super().send_head()
        
        if end:
            end = int(end)
        else:
            end = file_len - 1
        
        if start >= file_len:
            self.send_error(416, "Requested Range Not Satisfiable")
            f.close()
            return None
        
        if end >= file_len:
            end = file_len - 1
            
        content_len = end - start + 1
        
        self.send_response(206)
        self.send_header('Content-Type', ctype)
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{file_len}')
        self.send_header('Content-Length', str(content_len))
        self.send_header('Last-Modified', self.date_time_string(fs.st_mtime))
        self.end_headers()
        
        f.seek(start)
        return f

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def copyfile(self, source, outputfile):
        if not self.headers.get('Range'):
            super().copyfile(source, outputfile)
            return

        range_header = self.headers.get('Range')
        match = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not match:
            super().copyfile(source, outputfile)
            return
            
        start = int(match.group(1))
        end = match.group(2)
        
        try:
            file_len = os.fstat(source.fileno())[6]
        except Exception:
            super().copyfile(source, outputfile)
            return
            
        if end:
            end = int(end)
        else:
            end = file_len - 1
            
        if end >= file_len:
            end = file_len - 1
            
        remaining = end - start + 1
        buffer_size = 64 * 1024
        while remaining > 0:
            to_read = min(remaining, buffer_size)
            data = source.read(to_read)
            if not data:
                break
            outputfile.write(data)
            remaining -= len(data)

if __name__ == '__main__':
    port = 8080
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    
    # Enable socket reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), RangeRequestHandler) as httpd:
        print(f"Serving HTTP on port {port} with Range request support...")
        httpd.serve_forever()
