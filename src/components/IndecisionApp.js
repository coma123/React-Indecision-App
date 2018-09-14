import React from "react";
import AddOption from "./AddOption";
import Options from "./Options";
import Action from "./Action";
import Header from "./Header";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component{
  state = {
    options: [],
    error: undefined,
    subtitle: "Put your life in the hands of a computer",
    selectedOption: undefined
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({options}));
      }
    } catch (error) {
      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  handleRemoveAll = () => {
    this.setState(() => ({ options: [], error: undefined }));
  };

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };

  handlePick = () => {
    const rand = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[rand];
    this.setState(() => ({
      selectedOption: option
    }));
  };

  handleAddOption = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    if (this.state.options.indexOf(option) > -1) {
      this.setState(() => ({ error: "This item option exists" }));
      e.target.elements.option.value = "";
      return;
    }

    if (option) {
      this.setState((prevState) => ({ options: [...prevState.options, option] }));
      e.target.elements.option.value = "";
      this.setState(() => ({ error: undefined }));
    } else {
      e.target.elements.option.value = "";
      this.setState(() => ({ error: "Please enter valid value to add item" }));
    }
  };

  clearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  };

  render() {
    return (
      <div>
        <Header subtitle={this.state.subtitle} />
        <div className="container">
          <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
          <div className="widget">
            <Options options={this.state.options} handleRemoveAll={this.handleRemoveAll} handleDeleteOption={this.handleDeleteOption} />
            <AddOption handleAddOption={this.handleAddOption} error={this.state.error} />
          </div>
        </div>
        <OptionModal selectedOption={this.state.selectedOption} clearSelectedOption={this.clearSelectedOption}/>
      </div>
    );
  }
}