import React, { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../components/Typography/PageTitle';
import { Input, Label, Button } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/actions/userActions';
import {
  acceptStyle,
  baseStyle,
  focusedStyle,
  img,
  rejectStyle,
  thumb,
  thumbInner,
  thumbsContainer,
} from '../../components/react-dropzone-styles';
import { useDropzone } from 'react-dropzone';
import { upload } from '../../components/Upload';
import ModalComponent from '../../components/Modal';

function Blank() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filesToUpload, setFiles] = useState([]);
  const [url, setUrl] = useState();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'image/*': [],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = filesToUpload.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt=''
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const userCreate = useSelector((state) => state.userCreate);
  const { success, error } = userCreate;

  useEffect(() => {
    return () =>
      filesToUpload.forEach((file) => URL.revokeObjectURL(file.preview));
  });

  const createNewUser = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }

    dispatch(createUser(name, email, password, url));
  };

  return (
    <>
      <PageTitle>New Employee</PageTitle>
      <form
        className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'
        onSubmit={createNewUser}
      >
        <Label>
          <span>Name</span>
          <Input
            className='mt-3'
            placeholder='Abdulkader El Rawas'
            onChange={(e) => setName(e?.target?.value)}
          />
        </Label>

        <Label className='mt-4'>
          <span>Email</span>
          <Input
            className='mt-3'
            type='email'
            placeholder='abdulkader@auroral-realst.com'
            onChange={(e) => setEmail(e?.target?.value)}
          />
        </Label>

        <Label className='mt-4'>
          <span>Password</span>
          <Input
            className='mt-3'
            placeholder='********'
            type='password'
            onChange={(e) => setPassword(e?.target?.value)}
          />
        </Label>

        <Label className='mt-4'>
          <span>Avatar</span>
          <section className='mt-3'>
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>Drag & drop images here, or click to select file</p>
              <em>
                (1 file are the maximum number of files you can drop here)
              </em>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </section>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              console.log(filesToUpload);
              const uploaded = await upload(filesToUpload[0]);
              setUrl(uploaded);
            }}
          >
            upload images
          </Button>
          {url && <p>uploaded successfully: {url}</p>}
        </Label>

        <Button className='mt-4' size='large' type='submit'>
          Create
        </Button>
      </form>
      {success && (
        <ModalComponent
          location={'users'}
          message={'User Created Successfully'}
        />
      )}
      {error && <ModalComponent message={error} location={'users'} error />}
    </>
  );
}

export default Blank;
