import { useQuery, gql } from "@apollo/client";

const Query = gql`
   query User {
        User {
          email
          account
          balance
          private_key
          created_at
        }
      }
`

export default function User() {
    const { data, loading, error } = useQuery(Query);
  
    if (loading) {
      return(
       <h1>...Loading</h1>
      );
    }
  
    if (error) {
      console.error(error);
      return <h1>Sign In fail</h1>;
    }
  
  
    return (
      <div>
     
      </div>
    );
  }