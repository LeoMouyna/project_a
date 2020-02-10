module.exports = function(app, sequelize, models){

    console.log('\tinstitution requests loaded');

    let Institution = models.Institution;

     /**
     *   This request gets all the institutions in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of institutions
     */
    app.get('/institutions', function(req, res){
        Institution.findAll()
            .then(institutions => {
                res.send({'institutions': institutions});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *   This request gets an institution according to its id.
     *   arguments :
     *               id : the id of the institution
     *   returns :
     *               a json object containing the institution
     */
    app.get('/institutions/:id', function(req, res){
        Institution.findByPk(req.params.id)
            .then(institution => {
                res.send({'institution': institution});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests creates a new institution with the name, description, starting and ending date, supervisor id and event id
     *  arguments :
     *              name: the name of the institution
     *              type: the institution type
     *  returns :
     *              a json object containing the created institution
     */
    app.post('/institutions', function(req, res){
        console.log(req.body)
        Institution.create(req.body)
            .then(institution => {
                res.send({'institution': institution});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This request updates a institution according to its id.
     *  arguments :
     *              id : the id of the institution
     *              name: the name of the institution
     *              type: the institution type
     *  returns :
     *              the updated object
     */
    app.put('/institutions/:id', function(req, res){
        Institution.update(req.body, {where: {id: req.params.id}})
            .then(() => {
                Institution.findByPk(req.params.id)
                    .then(institution => {
                        res.send({'institution': institution});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err})
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests deletes a institution according to its id.
     *  arguments :
     *              id : the id of the institution
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/institutions/:id', function(req, res){
        Institution.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(result => {
                res.send({'result': result});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

}