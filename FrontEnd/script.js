
fetch ("http://localhost:5678/api/categories")
    .then( res => res.json)
    .then( works => console.log(works))