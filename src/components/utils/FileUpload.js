import { useRef, useState } from "react";

import { UploadIcon } from "./Icon";

function FileUpload(props) {
    const hiddenFileInput = useRef(null);
    const [fileText, setFileText] = useState("Upload File");
    
    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        // const fileName = props.handleFile(fileUploaded);
        setFileText(fileUploaded.name);
    };
    
    return (
        <>
            <div
                className="file-button"
                onClick={handleClick}>
                    <div className="file-name">
                        {fileText}
                    </div>
                    <UploadIcon />
            </div>
            <input type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{display:'none'}} 
            /> 
        </>
    );
};

export default FileUpload;