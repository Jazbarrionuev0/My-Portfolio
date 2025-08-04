# Video Support in Blog Editor

Your blog editor now supports video uploads and embedding! Here's how to use the new video features:

## Features Added

### 1. Video Upload Button
- **Upload Icon** (📹): Upload video files directly from your computer
- Supports common video formats: MP4, MOV, AVI, WebM
- Maximum file size: 100MB
- Videos are automatically uploaded to your storage and inserted into the editor

### 2. Video URL Button
- **Video Icon** (🎬): Insert videos from URLs
- Supports any video URL (MP4, MOV, etc.)
- Configurable options:
  - **Controls**: Show/hide video controls (play, pause, volume, etc.)
  - **Autoplay**: Start playing automatically (note: many browsers require muted for autoplay)
  - **Muted**: Start with audio muted
  - **Loop**: Repeat video continuously

### 3. Drag & Drop Support
- Drag video files directly into the editor
- Works alongside image drag & drop
- Automatic file type detection

### 4. Video Management
- **Edit**: Click on inserted videos to change the URL
- **Delete**: Remove videos with the delete button (appears on hover)
- **Responsive**: Videos automatically scale to fit the editor width

## How to Use

### Upload a Video File
1. Click the upload video button (📹) in the toolbar
2. Select a video file from your computer
3. Wait for upload to complete
4. Video will be automatically inserted at cursor position

### Insert Video from URL
1. Click the video URL button (🎬) in the toolbar
2. Enter the video URL
3. Configure playback options if needed
4. Click "Insert Video"

### Drag & Drop
1. Simply drag video files from your computer
2. Drop them anywhere in the editor
3. Videos will be uploaded and inserted automatically

## Supported Formats

- **Video**: MP4, MOV, AVI, WebM, OGV
- **Max Size**: 100MB per video
- **Storage**: Automatically uploaded to your configured cloud storage

## Examples

### Basic Video
```html
<video src="https://example.com/video.mp4" controls></video>
```

### Autoplay Video (Muted)
```html
<video src="https://example.com/video.mp4" controls autoplay muted></video>
```

### Looping Video
```html
<video src="https://example.com/video.mp4" controls loop></video>
```

## Technical Details

- Videos are stored using the same S3-compatible storage as images
- Video component supports all standard HTML5 video attributes
- Responsive design ensures videos work on all screen sizes
- Videos maintain aspect ratio automatically

## Notes

- **Autoplay**: Most browsers require videos to be muted for autoplay to work
- **Performance**: Large videos may take time to upload and load
- **Compatibility**: All modern browsers support the video formats
- **SEO**: Videos include proper alt text and title attributes
