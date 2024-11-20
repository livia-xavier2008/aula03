import React, { useEffect, useState } from "react";
import style from "../style/home.module.css";

export default function Home() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState(""); // Estado para controlar a pesquisa

  useEffect(() => {
    const receberListaProdutos = async () => {
      try {
        const resposta = await fetch("https://fakestoreapi.com/products");
        const dados = await resposta.json();
        setLista(dados);
      } catch (erro) {
        alert("A conexão falhou");
      } finally {
        setCarregando(false);
      }
    };
    receberListaProdutos();
  }, []);

  // Funções de filtro
  const orderAz = () => {
    const listaOrdenada = [...lista].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setLista(listaOrdenada);
  };

  const orderZa = () => {
    const listaOrdenada = [...lista].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    setLista(listaOrdenada);
  };

  const preçodomaiorparaomenor = () => {
    const listaOrdenada = [...lista].sort((a, b) => b.price - a.price);
    setLista(listaOrdenada);
  };

  const preçoMenorParaMaior = () => {
    const listaOrdenada = [...lista].sort((a, b) => a.price - b.price);
    setLista(listaOrdenada);
  };

  // Função para filtrar a lista de produtos com base no texto da pesquisa
  const buscarProdutos = (evento) => {
    setPesquisa(evento.target.value);
  };

  // Filtra a lista com base na pesquisa
  const listaFiltrada = lista.filter((produto) =>
    produto.title.toLowerCase().includes(pesquisa.toLowerCase())
  );

  if (carregando) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <h1 className={style.header}>Lista de Produtos</h1>
      <div className={style.filtros}>
        <button onClick={orderAz}>A-Z</button>
        <button onClick={orderZa}>Z-A</button>
        <button onClick={preçodomaiorparaomenor}>Preço: Maior para Menor</button>
        <button onClick={preçoMenorParaMaior}>Preço: Menor para Maior</button>
      </div>

      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar produto..."
        value={pesquisa}
        onChange={buscarProdutos}
        className={style.pesquisa}
      />

      <div className={style.container}>
        {listaFiltrada.map((produto) => (
          <div key={produto.id} className={style.card}>
            <img src={produto.image} alt={produto.title} />
            <h2>{produto.title}</h2>
            <p>{produto.description}</p>
            <p className={style.price}>Preço: R${produto.price}</p>
          </div>
        ))}
      </div>
    </>
  );
}
