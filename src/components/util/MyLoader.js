import React from 'react';
import { Loader } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css';

const MyLoader = ({ content }) => (
  <>
    <Loader content={content} />;
  </>
);

export default MyLoader;
