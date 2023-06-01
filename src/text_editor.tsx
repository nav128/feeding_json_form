// import React from 'react'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { reactInlineMath } from 'react-katex';
// import 'katex/dist/katex.min.css';

// const MathInput = () => {
//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'], // Basic formatting options
//       ['blockquote', 'code-block'], // Blockquote and code block
//       ['link', 'image'], // Link and image
//       [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headers
//       [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and unordered lists
//       [{ script: 'sub' }, { script: 'super' }], // Subscript and superscript
//       ['formula'], // Mathematical formula
//       ['clean'], // Remove formatting
//     ],
//   };

//   const formats = [
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'code-block',
//     'link',
//     'image',
//     'header',
//     'list',
//     'bullet',
//     'script',
//     'formula',
//   ];

//   return (
//     <div>
//         {/* @ts-inore */}
//         <ReactQuill
//             theme="snow"
//             modules={modules}
//             formats={formats}
//             placeholder="Enter your text..."
//             // Render the formula using react-katex
//             renderCustomFormulas={(value: any) => <reactInlineMath math={value} />}
//         />
//     </div>
//   );
// };

// export default MathInput;

import React, {FC} from 'react'

export const Dumb: FC = () => {
    return <p>Tadpis Mashehu</p>
}