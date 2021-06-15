import { useRef } from "react";

import { UploadIcon } from "./Icon";

function FileUpload({setFile, fileText, setFileText, setFileStatus}) {
    const hiddenFileInput = useRef(null);
    
    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];

		const formData = new FormData();
		formData.append('signal_file', fileUploaded);
        setFile(formData);
        setFileText(fileUploaded.name);
        setFileStatus(true);
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