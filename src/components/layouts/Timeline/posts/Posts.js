import { useEffect } from 'react';
import axios from 'axios';
import ListPosts from './ListPosts';

export default function Posts({ image, token }) {
  return (
    <>
      <ListPosts />
    </>
  );
}
