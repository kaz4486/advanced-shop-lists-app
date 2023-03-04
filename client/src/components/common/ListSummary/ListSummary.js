import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import SmallButton from '../SmallButton/SmallButton';

const ListSummary = ({ list }) => {
  return (
    <Container>
      <div key={list._id}>
        <h3>{list.name}</h3>
        <p>{list.publicationDate}</p>
        <Link to={'/lists/' + list._id}>
          <SmallButton>View more</SmallButton>
        </Link>
      </div>
    </Container>
  );
};

export default ListSummary;
