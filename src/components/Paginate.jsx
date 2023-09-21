// import React from 'react';
// import { Link } from 'react-router-dom';

// const Paginate = ({ pages, page, isAdmin = false }) => {
//   if (pages <= 1) return null;

//   return (
//     <div className="flex justify-center mt-4">
//       <ul className="flex space-x-2">
//         {[...Array(pages).keys()].map((x) => (
//           <li key={x + 1}>
//             <Link
//               to={
//                 !isAdmin
//                  ? `/page/${x + 1}`
//                   : `/admin/productList/${x + 1}`
//               }
//               className={`px-3 py-2 rounded-md ${
//                 x + 1 === page
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-white text-blue-500 hover:bg-blue-100'
//               }`}
//             >
//               {x + 1}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Paginate;

import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ totalPages, currentPage, isAdmin = false }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        {[...Array(totalPages).keys()].map((page) => (
          <li key={page + 1}>
            <Link
              to={
                !isAdmin
                  ? `/page/${currentPage + 1}`
                  : `/admin/productList/${currentPage + 1}`
              }
              className={`px-3 py-2 rounded-md ${
                page + 1 === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-500 hover:bg-blue-100'
              }`}
            >
              {page + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginate;
