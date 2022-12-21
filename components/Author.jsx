import React from 'react';
import Image from 'next/image';

import IMAGE  from '../public/post.jpg'

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
  <div className="absolute left-0 right-0 top-5 transform -translate-y-6">
    <Image
      className="align-middle rounded-full"
      unoptimized
      alt={author}
      priority
      height={180}
      width={120}
      src={IMAGE}
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    />
  </div>
  <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author}</h3>
  <p className="text-white text-ls">A Professional Software Engineer & Full-Stack Web Developer</p>
</div>

);

export default Author;