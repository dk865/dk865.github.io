from flask import Flask, render_template, request, redirect, url_for
import yt_dlp

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    url = request.form['url']
    format_selected = request.form['format']

    ydl_opts = {
        'format': format_selected,
        'outtmpl': '%(title)s.%(ext)s',
        'progress_hooks': [progress_hook],
        'nocheckcertificate': True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            ydl.download([url])
            return redirect(url_for('success'))
        except Exception as e:
            return render_template('error.html', error=str(e))

@app.route('/success')
def success():
    return render_template('success.html')

def progress_hook(d):
    if d['status'] == 'downloading':
        # Calculate download percentage
        if d['total_bytes'] is not None:
            progress_percent = d['downloaded_bytes'] / d['total_bytes'] * 100
        else:
            progress_percent = 0
        
        # Update progress status in real-time using JavaScript
        print(f"Downloading {d['filename']}: {progress_percent:.2f}%")

if __name__ == '__main__':
    app.run(debug=True)