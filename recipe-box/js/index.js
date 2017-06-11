"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var Form = ReactBootstrap.Form;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;

if (localStorage.getItem("recipeBox") == undefined) {
  var recipesObject = {
    items: [{
      title: "Tomato and Caper Linguine",
      ingredients: "cheese, tomato",
      link: "http://www.jamieoliver.com/recipes/pasta-recipes/tomato-caper-linguine/",
      image: "http://cdn.jamieoliver.com/recipe-database/430_575/FWu9vav74jz9YKkPYWnU44.jpg"
    }, {
      title: "Basic Pizza",
      ingredients: "flour, yeast",
      link: "http://www.jamieoliver.com/recipes/bread-recipes/basic-pizza/",
      image: "http://cdn.jamieoliver.com/recipe-database/oldImages/430_575/62_36_1429634659.jpg"
    }, {
      title: "Spanish tortilla",
      ingredients: "potatoes, onions",
      link: "http://www.jamieoliver.com/recipes/eggs-recipes/spanish-tortilla/",
      image: "http://cdn.jamieoliver.com/recipe-database/430_575/46260004.jpg"
    }, {
      title: "Pork and apple sausage rolls",
      ingredients: "pork, apple",
      link: "http://www.jamieoliver.com/recipes/pork-recipes/pork-apple-sausage-rolls/",
      image: "http://cdn.jamieoliver.com/recipe-database/430_575/3prSAmQJKKH8G0CFw_2UUT.jpg"
    }]
  };
  var recipes = JSON.stringify(recipesObject);

  localStorage.setItem("recipeBox", recipes);
}

var RecipeBox = function (_React$Component) {
  _inherits(RecipeBox, _React$Component);

  function RecipeBox(props) {
    _classCallCheck(this, RecipeBox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.loadRecipes = _this.loadRecipes.bind(_this);
    _this.state = { recipes: localStorage.getItem("recipeBox") };
    return _this;
  }

  RecipeBox.prototype.loadRecipes = function loadRecipes(recipesJson) {
    localStorage.setItem("recipeBox", JSON.stringify(recipesJson));
    this.setState({ recipes: localStorage.getItem("recipeBox") });
  };

  RecipeBox.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "div",
        { className: "row", id: "header" },
        React.createElement(
          "div",
          { className: "col-md-12" },
          React.createElement(
            "h1",
            null,
            "RecipeBox"
          ),
          React.createElement(
            "a",
            { href: "#" },
            "by cindy ah kioon"
          )
        )
      ),
      React.createElement(Recipes, {
        recipes: this.state.recipes,
        onChange: this.loadRecipes,
        onDelete: this.loadRecipes
      })
    );
  };

  return RecipeBox;
}(React.Component);

var Recipes = function (_React$Component2) {
  _inherits(Recipes, _React$Component2);

  function Recipes() {
    _classCallCheck(this, Recipes);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Recipes.prototype.render = function render() {
    var recipesJson = JSON.parse(this.props.recipes).items;
    console.log(recipesJson);
    var recipes = [];
    for (var item = 0; item < recipesJson.length; item++) {
      recipes.push(React.createElement(Recipe, {
        recipeIndex: item,
        recipeTitle: recipesJson[item]["title"],
        recipeIngredients: recipesJson[item]["ingredients"],
        recipeLink: recipesJson[item]["link"],
        recipeImage: recipesJson[item]["image"],
        onSave: this.props.onChange,
        onDelete: this.props.onChange
      }));
    }

    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-md-12" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(AddRecipe, { onSave: this.props.onChange }),
          recipes
        )
      )
    );
  };

  return Recipes;
}(React.Component);

var AddRecipe = function (_React$Component3) {
  _inherits(AddRecipe, _React$Component3);

  function AddRecipe() {
    _classCallCheck(this, AddRecipe);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  AddRecipe.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "col-xs-6 col-sm-4 col-md-3" },
      React.createElement(
        "div",
        { className: "thumbnail" },
        React.createElement(RecipeModal, {
          buttonText: React.createElement("i", { className: "fa fa-plus-circle fa-3x" }),
          title: "Add Recipe",
          recipeTitle: "Untitled",
          recipeIngredients: "",
          recipeImage: "",
          recipeIndex: "-1",
          onSave: this.props.onSave
        })
      )
    );
  };

  return AddRecipe;
}(React.Component);

var Recipe = function (_React$Component4) {
  _inherits(Recipe, _React$Component4);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this4 = _possibleConstructorReturn(this, _React$Component4.call(this, props));

    _this4.deleteRecipe = _this4.deleteRecipe.bind(_this4);
    return _this4;
  }

  Recipe.prototype.deleteRecipe = function deleteRecipe() {
    var recipesJson = JSON.parse(localStorage.getItem("recipeBox"));
    var recipeIndex = this.props.recipeIndex;
    recipesJson.items.splice(recipeIndex, 1);
    this.props.onSave(recipesJson);
  };

  Recipe.prototype.render = function render() {
    var imageCSS = {
      border: "none",
      background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.5)), url(" + this.props.recipeImage + ") no-repeat center"
    };
    return React.createElement(
      "div",
      { className: "col-xs-6 col-sm-4 col-md-3" },
      React.createElement(
        "div",
        { href: "#", className: "thumbnail", style: imageCSS },
        React.createElement(
          "h3",
          null,
          React.createElement(
            "a",
            { href: this.props.recipeLink, target: "_blank" },
            this.props.recipeTitle
          )
        ),
        React.createElement(RecipeModal, {
          buttonText: "Edit",
          title: "Edit Recipe",
          recipeIndex: this.props.recipeIndex,
          recipeTitle: this.props.recipeTitle,
          recipeIngredients: this.props.recipeIngredients,
          recipeLink: this.props.recipeLink,
          recipeImage: this.props.recipeImage
        }),
        React.createElement(
          Button,
          { bsStyle: "danger", onClick: this.deleteRecipe },
          "Delete"
        )
      )
    );
  };

  return Recipe;
}(React.Component);

var RecipeModal = function (_React$Component5) {
  _inherits(RecipeModal, _React$Component5);

  function RecipeModal(props) {
    _classCallCheck(this, RecipeModal);

    var _this5 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    _this5.openModal = _this5.openModal.bind(_this5);
    _this5.closeModal = _this5.closeModal.bind(_this5);
    _this5.saveRecipe = _this5.saveRecipe.bind(_this5);
    _this5.updateRecipeInput = _this5.updateRecipeInput.bind(_this5);
    _this5.state = {
      showModal: false,
      recipeTitle: _this5.props.recipeTitle,
      recipeIngredients: _this5.props.recipeIngredients,
      recipeLink: _this5.props.recipeLink,
      recipeImage: _this5.props.recipeImage
    };
    return _this5;
  }

  RecipeModal.prototype.openModal = function openModal() {
    this.setState({ showModal: true });
  };

  RecipeModal.prototype.closeModal = function closeModal() {
    this.setState({ showModal: false });
  };

  RecipeModal.prototype.saveRecipe = function saveRecipe() {
    var recipesJson = JSON.parse(localStorage.getItem("recipeBox"));
    var recipeIndex = this.props.recipeIndex;
    if (recipeIndex == -1) {
      recipesJson["items"].push({
        title: this.state.recipeTitle,
        ingredients: this.state.recipeIngredients,
        link: this.state.recipeLink,
        image: this.state.recipeImage
      });
    } else {
      recipesJson["items"][recipeIndex].title = this.state.recipeTitle;
      recipesJson["items"][recipeIndex].ingredients = this.state.recipeIngredients;
      recipesJson["items"][recipeIndex].link = this.state.recipeLink;
      recipesJson["items"][recipeIndex].image = this.state.recipeImage;
    }
    this.props.onSave(recipesJson);
    this.setState({
      showModal: false
    });
  };

  RecipeModal.prototype.updateRecipeInput = function updateRecipeInput(event) {
    var _setState;

    this.setState((_setState = {}, _setState[event.target.id] = event.target.value, _setState));
  };

  RecipeModal.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "static-Button" },
        React.createElement(
          Button,
          { bsStyle: "info", onClick: this.openModal },
          this.props.buttonText
        ),
        React.createElement(
          Modal,
          { show: this.state.showModal, onHide: this.closeModal },
          React.createElement(
            Modal.Header,
            null,
            React.createElement(
              Modal.Title,
              null,
              this.props.title
            )
          ),
          React.createElement(
            Modal.Body,
            null,
            React.createElement(RecipeInfo, {
              recipeIndex: this.props.recipeIndex,
              recipeTitle: this.state.recipeTitle,
              recipeIngredients: this.state.recipeIngredients,
              recipeLink: this.state.recipeLink,
              recipeImage: this.state.recipeImage,
              onChange: this.updateRecipeInput
            })
          ),
          React.createElement(
            Modal.Footer,
            null,
            React.createElement(
              Button,
              { bsStyle: "warning", onClick: this.closeModal },
              "Cancel"
            ),
            React.createElement(
              Button,
              { bsStyle: "success", onClick: this.saveRecipe },
              "Save"
            )
          )
        )
      )
    );
  };

  return RecipeModal;
}(React.Component);

var RecipeInfo = function (_React$Component6) {
  _inherits(RecipeInfo, _React$Component6);

  function RecipeInfo() {
    _classCallCheck(this, RecipeInfo);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  RecipeInfo.prototype.render = function render() {
    return React.createElement(
      Form,
      null,
      React.createElement(
        FormGroup,
        null,
        React.createElement(
          ControlLabel,
          null,
          "Recipe Name"
        ),
        React.createElement(FormControl, {
          type: "text",
          label: "Recipe",
          placeholder: "Recipe Name",
          id: "recipeTitle",
          value: this.props.recipeTitle,
          onChange: this.props.onChange
        })
      ),
      React.createElement(
        FormGroup,
        null,
        React.createElement(
          ControlLabel,
          null,
          "Recipe Image Url(optional)"
        ),
        React.createElement(FormControl, {
          type: "text",
          label: "Recipe Image Url",
          placeholder: "Recipe Image Url",
          id: "recipeImage",
          value: this.props.recipeImage,
          onChange: this.props.onChange
        })
      ),
      React.createElement(
        FormGroup,
        null,
        React.createElement(
          ControlLabel,
          null,
          "Ingredients (separate each ingredient with a comma)"
        ),
        React.createElement(FormControl, {
          componentClass: "textarea",
          label: "Ingredients",
          id: "recipeIngredients",
          value: this.props.recipeIngredients,
          onChange: this.props.onChange
        })
      ),
      React.createElement(
        FormGroup,
        null,
        React.createElement(
          ControlLabel,
          null,
          "Recipe Link (optional)"
        ),
        React.createElement(FormControl, {
          type: "text",
          label: "Recipe Link",
          placeholder: "Recipe Link",
          id: "recipeLink",
          value: this.props.recipeLink,
          onChange: this.props.onChange
        })
      )
    );
  };

  return RecipeInfo;
}(React.Component);

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById("recipeBox"));