import styled from 'styled-components'

export const BannerCont = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 30vh;
  margin-bottom: 20px;
  /* Dynamic theme using props */
  background-color: ${({ isdark }) => (isdark ? '#181818' : '#ffffff')};
  color: ${({ isdark }) => (isdark ? '#ffffff' : '#1e293b')};

  /* Optional: add slight dark overlay for dark mode */
  background-blend-mode: ${({ isdark }) => (isdark ? 'overlay' : 'normal')};
`;

export const HomeCont = styled.div`
  background-color: ${props => props.bgColor};
`
