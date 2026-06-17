import os
import re
import urllib.request
import urllib.parse

def download_single_cover():
    target_path = r"c:\Users\DELL\OneDrive\Documentos\ANTIGRAVITY workspaces v2\regalo-musical\assets\covers\toda-esta-ciudad.png"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Search query specifically for Apple Music CDN or Genius for the "Single" version
    query = "Kevin Kaarl Toda Esta Ciudad Single cover mzstatic"
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    print(f"Searching DuckDuckGo: {url}")
    
    req_search = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req_search) as response:
            html = response.read().decode('utf-8', errors='ignore')
            
            # Find Apple Music artwork URLs (mzstatic.com/image/thumb/...)
            # Typically looks like: https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/.../1000x1000bb.jpg
            mzstatic_urls = re.findall(r'https?://is\d+-ssl\.mzstatic\.com/image/thumb/[a-zA-Z0-9_\-\./]+/(?:1000x1000|600x600|500x500|1200x1200)[a-zA-Z0-9_\-\.]+', html)
            
            # Also search for Genius/Spotify CDNs just in case
            spotify_imgs = re.findall(r'https?://i\.scdn\.co/image/[a-f0-9]{40}', html)
            genius_imgs = re.findall(r'https?://images\.genius\.com/[a-f0-9]{32}\.[100x]*[a-z0-9\.]+', html)
            
            all_imgs = list(set(mzstatic_urls + spotify_imgs + genius_imgs))
            print(f"Found {len(all_imgs)} images in search results.")
            for img in all_imgs:
                try:
                    # Clean up url if it has escape characters or formatting issues
                    img_clean = img.replace('&amp;', '&')
                    print(f"Attempting to download: {img_clean}")
                    req_img = urllib.request.Request(img_clean, headers=headers)
                    with urllib.request.urlopen(req_img) as img_resp:
                        with open(target_path, 'wb') as f:
                            f.write(img_resp.read())
                    print(f"Successfully downloaded to {target_path}!")
                    return
                except Exception as ex:
                    print(f"Error downloading {img}: {ex}")
    except Exception as e:
        print(f"Error during search: {e}")

    # Fallback method: Scrape Apple Music page directly if we can find its URL
    # Let's search for "Kevin Kaarl Toda Esta Ciudad Single Apple Music"
    query_am = "Kevin Kaarl Toda Esta Ciudad Single Apple Music"
    url_am = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query_am)}"
    print(f"Searching for Apple Music page: {url_am}")
    try:
        req_am = urllib.request.Request(url_am, headers=headers)
        with urllib.request.urlopen(req_am) as response:
            html = response.read().decode('utf-8', errors='ignore')
            # Extract apple music page URLs
            am_pages = re.findall(r'https?://music\.apple\.com/[a-z]{2}/album/[a-zA-Z0-9_\-]+/\d+', html)
            if am_pages:
                am_page = am_pages[0]
                print(f"Found Apple Music page: {am_page}")
                req_page = urllib.request.Request(am_page, headers=headers)
                with urllib.request.urlopen(req_page) as page_resp:
                    page_html = page_resp.read().decode('utf-8', errors='ignore')
                    # Look for meta tag property="og:image" or mzstatic content links
                    og_img = re.search(r'<meta[^>]*property="og:image"[^>]*content="([^"]+)"', page_html) or \
                             re.search(r'<meta[^>]*content="([^"]+)"[^>]*property="og:image"', page_html)
                    if og_img:
                        img_url = og_img.group(1)
                        print(f"Found og:image on Apple Music page: {img_url}")
                        urllib.request.urlretrieve(img_url, target_path)
                        print(f"Successfully downloaded to {target_path}!")
                        return
    except Exception as e:
        print(f"Error scraping Apple Music: {e}")

    # Another fallback: DuckDuckGo images endpoint or Genius album search
    # Genius URL for Single: https://genius.com/Kevin-kaarl-toda-esta-ciudad-lyrics
    genius_lyrics_url = "https://genius.com/Kevin-kaarl-toda-esta-ciudad-lyrics"
    print(f"Trying Genius lyric page: {genius_lyrics_url}")
    try:
        req_g = urllib.request.Request(genius_lyrics_url, headers=headers)
        with urllib.request.urlopen(req_g) as response:
            g_html = response.read().decode('utf-8', errors='ignore')
            og_img = re.search(r'<meta[^>]*property="og:image"[^>]*content="([^"]+)"', g_html)
            if og_img:
                img_url = og_img.group(1)
                print(f"Found og:image on Genius page: {img_url}")
                urllib.request.urlretrieve(img_url, target_path)
                print(f"Successfully downloaded to {target_path}!")
                return
    except Exception as e:
        print(f"Error scraping Genius: {e}")

    print("All search-based methods failed.")

if __name__ == "__main__":
    download_single_cover()
