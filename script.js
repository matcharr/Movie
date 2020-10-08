const url = "https://www.omdbapi.com/?apikey=" + apikey;
const Readme = (id) => {
    $.ajax({
        method: 'GET',
        url: `${url}&i=${id}`,
        success: function(data) {
            const test = `
                    <!-- Full Height Modal Right -->
                    <div class="modal fade right" id="fullHeightModalRight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">

                    <!-- Add class .modal-full-height and then add class .modal-right (or other classes from list above) to set a position to the modal -->
                    <div class="modal-dialog modal-full-height modal-right" role="document">


                        <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title w-100" id="myModalLabel">${data.Title}</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img class="img-thumnail width="200" height="200" src="${data.Poster}" />
                            <h3>Synopsis: </h3></br>
                            <p>${data.Plot}</p>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
            `;
            $("#oof").html(test);
        }
    })
}

$("#movieForm").submit(function(event) {
    event.preventDefault();
    let movie = $("#movie").val();

    $.ajax({
        method: 'GET',
        url: url + "&s=" + movie,
        success: function(data) {
            console.log(data.Search);
            if (!data)
                return;
            const result = data.Search.map((item) => `
                <li class="movie-item">    
                <img style ="float:left" class="img-thumnail width="200" height="200" src="${item.Poster}" />
                    <label>Title : ${item.Title}</label>
                    <p>Date of release : ${item.Year}</p>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#fullHeightModalRight" onclick="Readme('${item.imdbID}')">
                        Reade more
                    </button>
                    </li>
                    `);
            $("#result").html(result);
        }
    })
})
