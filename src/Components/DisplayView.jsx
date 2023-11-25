import React from 'react';
import Image from 'next/image';
import Delete from '../Assets/icons/Delete.svg';

const DisplayView = ({
  title,
  content,
  onDelete,
  id,
  editedContent,
  setEditing,
}) => {
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  // Function to get a placeholder based on the content
  const getPlaceholder = () => {
    if (content === '') {
      return 'Take a note...';
    }
    if (editedContent.trim() === '') {
      return 'Empty note';
    }
    // Add more conditions if needed
    return '';
  };

  return (
    <div
      onClick={() => setEditing(true)}
      className="flex flex-col justify-between gap-4 p-2 w-full h-full"
    >
      <h1
        className="text-md font-semibold text-[#e8eaed] mb-2"
        style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
      >
        {title === '' ? 'Title' : title}
      </h1>
      <div
        className="mb-2 text-[#e8eaed] overflow-hidden overflow-ellipsis"
        style={{ fontSize: '1rem', maxHeight: '100px' }}
        dangerouslySetInnerHTML={content ? renderHTML(content) : null}
      >
        {content ? null : <p>{getPlaceholder()}</p>}
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => onDelete(id)}
          className="bg-[#202124] rounded p-1 cursor-pointer"
          title="Delete"
        >
          <Image
            src={Delete}
            alt="delete Icon"
            width={15}
            height={15}
            style={{ color: 'red' }}
          />
        </button>
      </div>
    </div>
  );
};

export default DisplayView;
