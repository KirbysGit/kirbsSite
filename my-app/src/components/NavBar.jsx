import React from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <StyledNav className="navbar">
      <NavList>
        {['education', 'projects', 'experience', 'skills'].map((item) => (
          <NavItem key={item}>
            <Link
              to={item}
              smooth={true}
              duration={500}
              spy={true}
              activeClass="active"
            >
              <StyledLink>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </StyledLink>
            </Link>
          </NavItem>
        ))}
      </NavList>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.surface};
  padding: 1rem 0;
  z-index: 100;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledLink = styled.div`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.cardHover};
  }

  .active & {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.cardHover};
  }
`;

export default NavBar;