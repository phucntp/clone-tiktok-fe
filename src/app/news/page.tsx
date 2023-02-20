import { Suspense } from 'react';
import Albums from './Albums.js';

export default function ArtistPage({  }) {
  return (
    <>
      <h1>{'aaa'}</h1>
      <Suspense fallback={<Loading />}>
        <button>ssss</button>
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
