import React,{ useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { NavbarTextContext } from '../NavbarProvider';

const useFilterable = () => {
  const router = useRouter();
  const { navbarText, filter, showProducts, setNavbarText, setFilter } = React.useContext(NavbarTextContext);
  const navBarCleared = useRef(false);
  const firstCheck = useRef(true);

  useEffect(() => {
    return () => {
      router.asPath = `/cart?timestamp=${Date.now()}`;
    };
  }, []);

  useEffect(() => {
    const handlePopstate = (event) => {
      if (event.state && event.state.url === '/filter' && event.state.as !== '/filter') {
        router.replace(event.state.as);
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [router]);

  useEffect(() => {
    const clearNavbar = () => {
      setNavbarText((prev) => {
        navBarCleared.current = true;
        setFilter(0);
        return '';
      });
    };


    if (firstCheck.current) {
      firstCheck.current = false;
      clearNavbar();
      return;
    }

    if (!navBarCleared.current) {
      clearNavbar();
    }
    if (navbarText.length > 0 && filter > 0 && navBarCleared.current) {
      router.push('/filter' ,{query:{q:navbarText,category:filter}});
      return 
    }
    if (navbarText.length > 0  && navBarCleared.current) {
      router.push('/filter' ,{query:{q:navbarText}});
      return
    }
    if (filter > 0 && navBarCleared.current) {
      router.push('/filter' ,{query:{category:filter}});
      return
    }
    
  }, [navbarText, filter, showProducts, router, navBarCleared, firstCheck]);
};

export default useFilterable;
