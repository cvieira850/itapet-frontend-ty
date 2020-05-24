import React, { useState, useEffect, useCallback } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { Container, DataHeader, Data, NoData, Paginator } from './styles';
import Header from '../../components/Header/index.js';

const Home: React.FC = () => {
  const [postTitle, setPostTitle] = useState();
  const [posts, setPosts] = useState([]);
  const [lastPage, setLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const { addToast } = useToast();
  const { history } = useHistory();

  const fecthPosts = useCallback(
    async (currentPage: number) => {
      try {
        const { data } = await api.get('posts', {
          params: { q: postTitle, page: currentPage },
        });

        setPage(currentPage);
        setLastPage(data.lastPage);
        setPosts(data.content);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        addToast({
          type: 'error',
          title: 'Erro captura de pagina',
          description: 'Ocorreu um erro ao buscar posts, tente novamente. ',
        });
      }
    },

    [postTitle, addToast],
  );
  useEffect(() => {
    fecthPosts(1);
  }, []); //eslint-disable-line
  const handlePostTitleChange = useCallback(e => {
    setPostTitle(e.target.value);
  }, []);

  /* function handlePostTitleChange(e) {
    setPostTitle(e.target.value);
  } */
  const handleDeletePost = useCallback(
    async ({ id }) => {
    if (window.confirm(`Tem certeza que deseja deletar o post?`))  //eslint-disable-line
        try {
          await api.delete(`/posts/${id}`);

          const newPosts = posts.filter(post => post.id !== id);

          let newPage = newPosts.length ? page : page - 1;
          if (newPage === 0) {
            newPage = 1;
          }

          fecthPosts(newPage);

          addToast({
            type: 'success',
            title: 'Post removido',
            description: 'O post foi removido com sucesso!',
          });
        } catch (err) {
          // const { error } = err.response.data;
          addToast({
            type: 'error',
            title: 'Falha ao tentar remover o post',
            description:
              'Ocorreu um erro ao tentar remover o post, tente novamente.',
          });
        }
    },
    [addToast, fecthPosts, page, posts],
  );
  /* async function handleDeletePost({ id }) {
    if (window.confirm(`Tem certeza que deseja deletar o post?`))  //eslint-disable-line
      try {
        await api.delete(`/posts/${id}`);

        const newPosts = posts.filter(post => post.id !== id);

        let newPage = newPosts.length ? page : page - 1;
        if (newPage === 0) {
          newPage = 1;
        }

        fecthPosts(newPage);

        addToast({
          type: 'success',
          title: 'Post removido',
          description: 'O post foi removido com sucesso!',
        });
      } catch (err) {
        const { error } = err.response.data;
        addToast({
          type: 'error',
          title: 'Falha ao tentar remover o post',
          description:
            'Ocorreu um erro ao tentar remover o post, tente novamente.',
        });
      }
  } */

  const handlePreviousPageChange = useCallback(() => {
    const currentPage = page - 1;
    fecthPosts(currentPage);
  }, [fecthPosts, page]);
  /* function handlePreviousPageChange() {
    const currentPage = page - 1;
    fecthPosts(currentPage);
  } */
  const handleNextPageChange = useCallback(() => {
    const currentPage = page + 1;
    fecthPosts(currentPage);
  }, [fecthPosts, page]);
  /* function handleNextPageChange() {
    const currentPage = page + 1;
    fecthPosts(currentPage);
  } */

  return (
    <>
      <Header />
      <Container>
        <DataHeader>
          <strong>FEED</strong>
          <Link to="/posts/new">
            <MdAdd color="#fff" size={20} />
            <span>CADASTRAR</span>
          </Link>
          {/* <button
            type="button"
            onClick={() => history.push('/posts/new')}
          ></button> */}
          <span>
            <MdSearch color="#999999" size={16} />
            <input
              name="postTitle"
              placeholder="Buscar post"
              onKeyDown={event => event.key === 'Enter' && fecthPosts(1)}
              onChange={handlePostTitleChange}
            />
          </span>
        </DataHeader>

        {posts.length ? (
          <>
            <Data>
              {posts.map(post => (
                <div key={post.id}>
                  <h2>{post.title}</h2>
                  <h4>{post.text}</h4>
                  <p>Usuário {post.user_id}</p>
                  {/* <Link to=`/posts/${post.id}/edit`>Editar</Link> */}
                  <button
                    type="button"
                    onClick={() => history.push(`/posts/${post.id}/edit`)}
                  >
                    editar
                  </button>
                  <button type="button" onClick={() => handleDeletePost(post)}>
                    apagar
                  </button>
                </div>
              ))}
            </Data>

            <Paginator>
              <button
                type="button"
                disabled={page === 1}
                onClick={() => {
                  handlePreviousPageChange();
                }}
              >
                Anterior
              </button>
              <button
                disabled={lastPage}
                type="button"
                onClick={() => {
                  handleNextPageChange();
                }}
              >
                Próxima
              </button>
            </Paginator>
          </>
        ) : (
          <NoData>
            <span>Nenhum post encontrado</span>
          </NoData>
        )}
      </Container>
    </>
  );
};
export default Home;
