import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const ListSummary = ({ list }) => {
  return (
    <Container>
      <div key={list._id}>
        <h3>{list.name}</h3>
        <p>{list.publicationDate}</p>
        <Link to={'/lists/' + list._id}>
          <Button>view more</Button>
        </Link>
      </div>
    </Container>
  );
};

export default ListSummary;
