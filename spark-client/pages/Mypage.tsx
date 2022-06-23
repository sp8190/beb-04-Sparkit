import { gql } from "@apollo/client";
import client from "../apollo-client";

// export async function getStaticProps() {
//     const { data } = await client.query({
//       query: gql`
//         query User {
//           User {
//             email
//             nickname
//             account
//             balance
//             private_key
//             created_at
//           }
//         }
//       `,
//     });
  
//     return {
//       props: {
//         User: data.countries.slice(0, 4),
//       },
//    };
//   }

export default function Mypage() {


    return (
        <div>
            마이페이지
        </div>

    )
}