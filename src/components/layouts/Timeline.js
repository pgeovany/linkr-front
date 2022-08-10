import styled from 'styled-components';
import Navbar from './Navbar';

export default function Timeline() {
  return (
    <>
      <Navbar />
      <TimelineContainer></TimelineContainer>
    </>
  );
}

const TimelineContainer = styled.div`
  margin-top: 72px;
  width: 100%;
  background-color: #333333;
`;
