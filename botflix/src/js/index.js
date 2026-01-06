async function handleSearch() {
    const mood = moodTextArea.value.trim();

    if (!mood) {
        alert("Preencha o campo de humor!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5678/webhook/botflix", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userPrompt: mood }),
        });

        if (!response.ok) throw new Error("Erro na resposta do servidor");

        const data = await response.json();

        if (data && data.title) {
            const movie = data;
            const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            const resultsDiv = document.getElementById("results");
            const moviesGrid = document.getElementById("movies-grid");

            resultsDiv.classList.add("show");

            moviesGrid.innerHTML = `<div class="movie-card">
                <div class="movie-poster">
                    <img src="${posterUrl}" alt="${movie.title}" />
                </div>
                <div class="movie-info">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-overview">${movie.overview || "Sem descrição."}</div>
                    <div class="movie-rating">⭐ ${movie.vote_average?.toFixed() || "N/A"} / 10</div>
                </div>
            </div>`;
        }
    } catch (error) {
        console.error("Erro ao buscar o filme:", error);
        alert("Não foi possível buscar o filme. Tente novamente.");
    }
}
