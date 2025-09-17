// Importo l'array di post da un file esterno
const posts = require('../data/posts.js');

// Funzione per ottenere tutti i post, con filtro opzionale per tag
const getAllPosts = (req, res) => {
    const tag = req.query.tag; // Leggo il parametro 'tag' dalla query string

    let filteredPosts = posts; // Parto con tutti i post

    // Se il tag è presente nella query, filtro i post che lo contengono
    if (tag) {
        filteredPosts = posts.filter(item => {
            // Converto i tag in minuscolo per confronto case-insensitive
            return item.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase());
        });

        // Se non ci sono post con quel tag, ritorno errore 404
        if (filteredPosts.length === 0) {
            return res.status(404).json({ message: 'Nessun post trovato con il tag indicato' });
        }
    }

    // Ritorno i post filtrati (o tutti se nessun tag era presente)
    res.json(filteredPosts);
};

// Funzione per ricevere dati (simula il salvataggio, utile per debug/test)
function store(req, res) {
  console.log(req.body); // Stampo i dati ricevuti nel corpo della richiesta
  res.send("Dati ricevuti"); // Risposta semplice al client
}

// Funzione per ottenere un singolo post tramite ID
const getPostById = (req, res) => {
    const id = parseInt(req.params.id); // Leggo l'ID dalla URL
    const post = posts.find(post => post.id === id); // Cerco il post con quell'ID

    // Se il post non esiste, ritorno errore 404
    if (!post) {
        return res.status(404).json({ message: 'Post non trovato' });
    }

    // Se il post esiste, lo ritorno come risposta
    res.json(post);
};

// Funzione per creare un nuovo post
const createPost = (req, res) => {
  const { title, content, image, tags } = req.body; // Estraggo i dati dal corpo della richiesta

  // Controllo che title e content siano presenti
  if (!title || !content) {
    return res.status(400).json({ message: "Titolo e contenuto sono obbligatori" });
  }

  // Genero un nuovo ID da inserire nell'array
  const nuovoId = posts[posts.length -1].id + 1;

  // Creo il nuovo oggetto post
  const nuovoPost = {
    id: nuovoId,
    title,
    content,
    image,
    tags
  };

  // Aggiungo il nuovo post all'array dei post
  posts.push(nuovoPost);

  // Stampo il nuovo post nella console (debug)
  console.log('Post aggiunto:', nuovoPost);

  // Rispondo con lo stato 201 (creato) e il post appena creato
  res.status(201).json(nuovoPost);
};

// Funzione per aggiornare completamente un post esistente
const updatePost = (req, res) => {
  const id = parseInt(req.params.id); // Leggo l'ID dalla URL
  const { title, content, image, tags } = req.body; // Dati aggiornati dal corpo della richiesta

  const post = posts.find(item => item.id === id); // Cerco l'indice del post

  // Se non trovo il post, ritorno errore 404
  if (!post) {
    return res.status(404).json({ message: 'Post non trovato' });
  }

  // Se mancano title o content, ritorno errore 400 (bad request)
  if (!title || !content) {
    return res.status(400).json({ message: 'Titolo e contenuto sono obbligatori' });
  }

  // Creo l'oggetto aggiornato
  const updatedPost = {
    id,
    title,
    content,
    image,
    tags
  };

  // Sostituisco il vecchio post con quello nuovo
  posts[index] = updatedPost;

  // Ritorno il post aggiornato
  res.json(updatedPost);
};

// Funzione per modifica parziale di un post (placeholder)
const partialUpdatePost = (req, res) => {
    res.send(`Modifica parziale del post ${req.params.id}`);
};

// Funzione per cancellare un post
const deletePost = (req, res) => {
    const id = parseInt(req.params.id); // Leggo l'ID dalla URL

    const index = posts.findIndex(item => item.id === id); // Cerco l'indice del post

    // Se non trovo il post, ritorno errore 404
    if (index === -1) {
        return res.status(404).json({ message: 'Post non trovato' });
    }

    // Rimuovo il post dall'array
    posts.splice(index, 1);

    // Ritorno stato 204 (nessun contenuto)
    res.status(204).send();
};

// Esporto tutte le funzioni per poterle usare in altri file
module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    partialUpdatePost,
    deletePost, 
};