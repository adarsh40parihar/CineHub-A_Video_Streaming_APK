const fs = require('fs');
const path = require('path');


const getAllVideos = async(req, res) => {
    try {
        const videoDirectory = path.join(__dirname, "..", "Videos"); 
        const files = fs.readdirSync(videoDirectory);
        const mp4Files = files.filter(
            (file) => {
                const ext = path.extname(file).toLowerCase();
                return ext === ".mp4" || ext === ".mkv";
            }
        );
        const videoList = mp4Files.map((file) => ({
            id: path.parse(file).name,
            name: file,
        }));
        res.status(200).json({
            status: "success",
            data: videoList,
        });
    } catch (err) {
        return res.status(500).json({
        message: err.message,
        status: "failure",
        });
    }
}
const getVideoStream = async (req, res) => {
    try {
        let id = req.query.id; // ID of video to be streamed

        // Get the range from the request header => video player
        const range = req.headers.range;
        if (range) {
            const videoPath = path.join(__dirname, "..", "Videos", `${id}.mp4`); //path to the video
            if (!fs.existsSync(videoPath)) {
              return res.status(404).json({ message: "Video not found" });
            }
            const stat = fs.statSync(videoPath); // Get the file size in bytes
            const fileSize = stat.size;
                
            // Parse Range
            const CHUNK_SIZE = 500 * 1024;
            let parts = range.replace(/bytes=/, "").split("-"); // Format is 'bytes=0-1000'
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + CHUNK_SIZE, fileSize - 1);;
            // Validate range
            if (isNaN(start) || isNaN(end) || start >= fileSize || start > end) {
                return res.status(416).json({ message: "Invalid range request" });
            }
            // Set response headers
            const contentLength = end - start + 1;
            const header = {
                "Content-Type": "video/mp4",
                "Content-Length": contentLength,
                "Accept-Ranges": "bytes",
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            };
            //send a 206 Partial Content Status
            res.writeHead(206, header);
            //Pipe the file stream to the response
            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
        } else {
            res.status(400).json({
            message: "Invalid range request",
            });
  }
    } catch (err) {
           return res.status(500).json({
             message: err.message,
             status: "failure",
           }); 
    }
 
};

module.exports = {
  getAllVideos,
  getVideoStream,
};