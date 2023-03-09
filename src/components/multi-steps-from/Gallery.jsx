

import React from 'react';
import { Link } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
export default function Gallery() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url" >
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, }) => (
        // write your building UI
        <>
          <div className="form-group col" >
            <div className="form-group">
              <div className="upload">
                <div className="upload-files">
                  <div className="body" id="drop" >
                    <div className='overDrop'
                      style={isDragging && !imageList[0] ? { outlineColor: 'black' } : imageList[0] ? { outline: 'none' } : undefined}
                      onClick={!imageList[0] && onImageUpload}
                      {...dragProps} >

                      {imageList[0] && imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image['data_url']} alt="" width="100" />
                        </div>
                      ))}

                    </div>
                    {!imageList[0] && <p className="pointer-none">
                      <b>Drag and drop</b> files here <br /> or{" "}
                      <Link onClick={onImageUpload} to="" id="triggerFile">
                        browse
                      </Link>{" "}
                      to begin the upload
                    </p>}

                    {imageList[0] &&
                    <div className='btn-even pt-4 row'>
                      <button className='btn-remove' onClick={() => onImageRemove(0)}><i class="fas fa-times"></i></button>
                      <button className='btn-update' onClick={() => onImageUpdate(0)}><i class="fas fa-upload"></i></button>
                    </div>
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </ImageUploading>

  );
}

