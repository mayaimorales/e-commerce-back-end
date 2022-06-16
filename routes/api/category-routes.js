const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.is, {
      include: [{ model: Product}],
    });

    if(!categoryData){
      res.status(404).json({message: 'No category with this id'});
      return;
    }
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category

  try {
    const category = await Category.create(req.body);
    res.json(category);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json("Successfully updated category");
  }
  catch (err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    res.json("Successfully deleted category");
  }
  catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
