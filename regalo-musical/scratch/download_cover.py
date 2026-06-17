import os
import re
import urllib.request
import urllib.parse

def download_cover():
    target_path = r"c:\Users\DELL\OneDrive\Documentos\ANTIGRAVITY workspaces v2\regalo-musical\assets\covers\toda-esta-ciudad.png"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Method 1: Scrape Genius album page
    genius_url = "https://genius.com/albums/Kevin-kaarl/Paris-texas"
    print(f"Trying to scrape Genius album page: {genius_url}")
    req_genius = urllib.request.Request(genius_url, headers=headers)
    try:
        with urllib.request.urlopen(req_genius) as response:
            g_html = response.read().decode('utf-8', errors='ignore')
            # Look for og:image meta tag
            # <meta content="https://images.genius.com/39b7ea3b8d601b33365825bc5e90d23b.1000x1000x1.jpg" property="og:image" />
            og_img = re.search(r'<meta[^>]*property="og:image"[^>]*content="([^"]+)"', g_html) or \
                     re.search(r'<meta[^>]*content="([^"]+)"[^>]*property="og:image"', g_html)
            if og_img:
                img_url = og_img.group(1)
                print(f"Found og:image on Genius page: {img_url}")
                urllib.request.urlretrieve(img_url, target_path)
                print(f"Successfully downloaded to {target_path}!")
                return
    except Exception as e:
        print(f"Error scraping Genius: {e}")

    # Method 2: Spotify CDN URLs commonly associated with Paris Texas
    # Let's try a couple of known Spotify image hashes for Paris Texas album
    spotify_hashes = [
        "ab67616d0000b273b06ee248102a7b1b36965154", # album cover
        "ab67616d0000b2735767b2cb1dfd92ab0488667a",
        "ab67616d00001e02b06ee248102a7b1b36965154",
    ]
    
    for h in spotify_hashes:
        spotify_cover_url = f"https://i.scdn.co/image/{h}"
        try:
            print(f"Trying Spotify CDN URL: {spotify_cover_url}")
            req = urllib.request.Request(spotify_cover_url, headers=headers)
            with urllib.request.urlopen(req) as response:
                with open(target_path, 'wb') as f:
                    f.write(response.read())
            print(f"Successfully downloaded to {target_path}!")
            return
        except Exception as e:
            print(f"Error downloading Spotify CDN {h}: {e}")

    # Method 3: DuckDuckGo search result direct search
    query = "Kevin Kaarl Paris Texas cover art"
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    print(f"Searching DuckDuckGo: {url}")
    req_search = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req_search) as response:
            html = response.read().decode('utf-8', errors='ignore')
            # Extract links containing images
            spotify_imgs = re.findall(r'https?://i\.scdn\.co/image/[a-f0-9]{40}', html)
            genius_imgs = re.findall(r'https?://images\.genius\.com/[a-f0-9]{32}\.[100x]*[a-z0-9\.]+', html)
            
            all_imgs = list(set(spotify_imgs + genius_imgs))
            print(f"Found {len(all_imgs)} images in search results.")
            for img in all_imgs:
                try:
                    print(f"Downloading found search image: {img}")
                    urllib.request.urlretrieve(img, target_path)
                    print(f"Successfully downloaded to {target_path}!")
                    return
                except Exception as ex:
                    print(f"Error downloading {img}: {ex}")
    except Exception as e:
        print(f"Error during search: {e}")

    print("All methods failed to download the cover art.")

if __name__ == "__main__":
    download_cover()
