/* eslint-disable no-shadow */
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import firebase from "firebase/compat/app";
import Link from "next/link";
import { User } from "phosphor-react";

import AuthContext from "../../contexts/AuthContext";
import { auth } from "../../services/firebase";
import Button from "../Buttons";
import { HeaderContainer } from "./styles";

interface HeaderProps {
  light?: boolean;
  absolute?: boolean;
}

export default function Header(props: HeaderProps) {
  // const "/" = location.pathname;
  const { user, signInWithGitHub } = useContext(AuthContext);

  const [openMenu, setOpenMenu] = useState(false);
  const [gitHubUser, setGitHubUser] = useState<any>([]);
  const body = document.querySelector("body") as HTMLElement;

  const handleToggleMenu = () => setOpenMenu(!openMenu);

  const handleLoginWithGithub = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(function () {
          setGitHubUser(null);
          alert("Você saiu da conta.");
          // location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openMenu) {
      body.classList.add("open");
    } else {
      body.classList.remove("open");
      body.removeAttribute("class");
    }
  }, [openMenu]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const {
          displayName,
          photoURL,
          uid,
          email,
          metadata: { creationTime, lastSignInTime },
        } = user;

        const getGitHubData = async () => {
          if (!user.photoURL) return;

          const response = await axios.get(
            `https://api.github.com/user/${
              user.photoURL
                .replace("https://avatars.githubusercontent.com/u/", "")
                .split("?")[0]
            }`,
          );

          const { data } = response;

          setGitHubUser({
            id: uid,
            username: data.login,
            name: displayName,
            avatar: photoURL,
            email,
            metadata: { creationTime, lastSignInTime },
            admin: false,
          });
        };

        getGitHubData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <HeaderContainer light={props.light} absolute={props.absolute}>
      <nav>
        <a id="logo" href="/">
          <img src="../../pizy-group-logo-not-filled.png" alt="PIZY Group" />
        </a>

        {/* <ul className={openMenu ? "menu-opened" : null}>
          <div className="links">
            <a href="/" className="active">
              Início
            </a>
            <a href="/projects" className="">
              Projetos
            </a>
            <a href="/members" className="">
              Equipe
            </a>
            <a href="/blog" className="">
              Blog
            </a>
          </div> */}

        {/* <NavigationMenu.Root>
            <NavigationMenu.List>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Item one</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  Item one content
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Trigger>Item two</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                  Item two content
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>
            <NavigationMenu.Viewport />
          </NavigationMenu.Root> */}

        {/* <div className="actions">
            {user ? (
              <>
                <a href="https://pizy.vercel.app/" onClick={handleLogout}>
                  Sair
                </a>
                <Link href={`/user/${gitHubUser.username}`}>
                  <button
                    type="button"
                    className="user"
                    title={`Logado como ${gitHubUser.username}.`}
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`Logado como ${user.login} - ${user.name}.`}
                      />
                    ) : (
                      <User />
                    )}
                  </button>
                </Link>
              </>
            ) : (
              <a
                href="https://pizy.vercel.app/"
                onClick={handleLoginWithGithub}
              >
                <Button>Entrar</Button>
              </a>
            )}
          </div>
        </ul> */}
        <button
          type="button"
          className={
            openMenu ? "burger-container menu-opened" : "burger-container"
          }
          onClick={handleToggleMenu}
        >
          <div className="burger">
            <div className="bar" />
            <div className="bar" />
          </div>
        </button>
      </nav>
    </HeaderContainer>
  );
}
