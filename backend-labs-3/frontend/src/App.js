import { useEffect, useState } from "react";
import cl from './App.module.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8081/php/api/subscribers?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Помилка при завантаженні");
        return res.json();
      })
      .then((data) => {
        setUsers(data.data);
        setTotalPages(data.meta?.last_page || 1);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (loading) return <div className={cl.loading}>Loading...</div>;
  if (error) return <div className={cl.error}>Error: {error}</div>;

  return (
    <div className={cl.app__container}>
      <h1 className={cl.title}>Subscribers and subscriptions</h1>

      {users.length === 0 && <p className={cl.no__users}>Subscribers not found</p>}

      {users.map((user) => (
        <div key={user.id} className={cl.user__card}>
          <h2 className={cl.user__name}>{user.name}</h2>
          <p className={cl.user__email}>Email: {user.email}</p>
          <h3 className={cl.subscriptions__title}>Subscriptions:</h3>
          <ul className={cl.subscriptions__list}>
            {user.subscriptions?.length > 0 ? (
              user.subscriptions.map((sub) => (
                <li key={sub.id} className={cl.subscription__item}>
                  <b>Service:</b> {sub.service} <br />
                  <b>Topic:</b> {sub.topic} <br />
                  <b>Payload:</b>{" "}
                  {(() => {
                    try {
                      return JSON.parse(sub.payload).data;
                    } catch {
                      return sub.payload;
                    }
                  })()}{" "}
                  <br />
                  <b>Expired at:</b> {sub.expired_at}
                </li>
              ))
            ) : (
              <li className={cl.no__subscriptions}>Subscriptions not found</li>
            )}
          </ul>
        </div>
      ))}

      <div className={cl.pagination}>
        <button onClick={handlePrev} disabled={page === 1} className={cl.btn}>
          Previous
        </button>
        <span className={cl.page__info}>
          Page {page} з {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages} className={cl.btn}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;