function Upload() {
    return (
        <div className="upload">
            <h1>Upload Music</h1>
            <button className="upload__button">Upload</button>
            <button className="submit__button">Submit</button>
        </div>
    );
}

function Home() {
    return (
        <div className="home-container">
            <Upload />
        </div>
    );
}

export default Home;