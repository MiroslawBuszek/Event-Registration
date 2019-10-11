import React, { Component } from 'react';
import ShowCandidates from './components/showCandidates/showCandidates';
import CandidateForm from './components/addCandidate/form';
import RouterButtons from './components/showCandidates/routerButtons';
import FileSaver from 'file-saver';
const {endpoint} = require('./config');
const allCandidatesURL = endpoint + "candidates"
const filterLectureURL = endpoint +  "candidates/lecture"
const filterWorkshopURL = endpoint + "candidates/workshop/"
const decisionChangeURL = endpoint + "candidates/manageDecision"
const getReportURL = endpoint + "candidates/getForReport"


class App extends Component {
  state = {
    candidates: [],
    csv:[],
    filteredCandidates: [],
    searchQuery: '',
    endpoints: {
      allCandidates:  allCandidatesURL,
      filterLecture: filterLectureURL,
      filterWorkshop: filterWorkshopURL,
      decisionChange: decisionChangeURL,
      getReport: getReportURL
    },
    filter: 'menu',
    workshopFilter: false,
  }

  fetchData = async url => {
    const data = await fetch(url);
    return data.json();
  }

  async componentDidMount() {
    await this.filterAllCandidates();
    const reports = await this.getData();
    this.setState({
        csv: reports,
    })
  }

  filterAllCandidates = async () => {
    const data = await this.fetchData(this.state.endpoints.allCandidates);
    this.setState({ candidates: data, filteredCandidates: data, workshopFilter: false });
  }

  filterLectureCandidates = async () => {
    const filteredCandidates = await this.fetchData(this.state.endpoints.filterLecture);
    this.setState({ filteredCandidates, workshopFilter: false });
  }

  filterWorkshopCandidates = async event => {
    const workshop = event.target.value;
    const endpoint = `${this.state.endpoints.filterWorkshop}${workshop}`

    if (workshop === "all")
      this.filterAllCandidates();
    else {
      const filteredCandidates = await this.fetchData(endpoint);
      this.setState({ filteredCandidates, workshopFilter: true });
    }
  }

  updateCandidatesArray = (candidates, candidate, decision) => {
    const index = [...candidates].findIndex(c => c.email === candidate.email);
    candidates[index].decision = decision;
    return candidates
  }

  handleDecisionChange = async (event, candidate) => {
    const { email } = candidate;
    const decision = event.target.name;
    const body = { decision, email };

    const url = this.state.endpoints.decisionChange;
    const options = {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }

    try {
      await fetch(url, options);

      this.setState({ candidates: this.updateCandidatesArray(this.state.candidates, candidate, decision) });
      this.setState({ filteredCandidates: this.updateCandidatesArray(this.state.filteredCandidates, candidate, decision) });
    } catch (error) {
      alert(error);
    }
  }

  getData = async () => {
    const data = await this.fetchData(this.state.endpoints.getReport);
    return data
  }

  changeView = view => {
    this.setState({ filter: view });
  }

  saveFiles = async () => {
   
    const datas = await this.getData()  

    const rejected = datas.rejected.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "");
    const workshop1 = datas.work1.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "");
    const workshop2 = datas.work2.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "");
    const workshop3 = datas.work3.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "");
    const workshop4 = datas.work4.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "");
    const workshop5 = datas.work5.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "");
    const workshop6 = datas.work6.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "");
    const lecture = datas.accLecture.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "") + 
                    datas.mvLecture.map(rej => `${rej.name}; ${rej.lastname}; ${rej.email}\n`).reduce((previous, key)=> previous + key, "") ;

    FileSaver.saveAs(new Blob([rejected], {type: "text/plain;charset=utf-8"}), "rejected.csv");    
    FileSaver.saveAs(new Blob([workshop1], {type: "text/plain;charset=utf-8"}), "work1.csv");    
    FileSaver.saveAs(new Blob([workshop2], {type: "text/plain;charset=utf-8"}), "work2.csv");    
    FileSaver.saveAs(new Blob([workshop3], {type: "text/plain;charset=utf-8"}), "work3.csv");   
    FileSaver.saveAs(new Blob([workshop4], {type: "text/plain;charset=utf-8"}), "work4.csv");    
    FileSaver.saveAs(new Blob([workshop5], {type: "text/plain;charset=utf-8"}), "work5.csv");    
    FileSaver.saveAs(new Blob([workshop6], {type: "text/plain;charset=utf-8"}), "work6.csv");   
    FileSaver.saveAs(new Blob([lecture], {type: "text/plain;charset=utf-8"}), "lecture.csv");
}

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery, workshopFilter: false })
  }

  getTableData = () => {
    const { filteredCandidates, searchQuery } = this.state;
    let filtered = filteredCandidates;
    if (searchQuery) {
      filtered = this.state.filteredCandidates.filter(candidate =>
        (candidate.name.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
        (candidate.lastname.toLowerCase().startsWith(searchQuery.toLowerCase())) ||
        (candidate.email.toLowerCase().startsWith(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }

  render() {
    const { filter, candidates, workshopFilter, searchQuery } = this.state;
    const filteredCandidates = this.getTableData();

    return (
      <div className="container"> 
      <button type="button" className="btn btn-primary" onClick={() => this.saveFiles()}>Download raports</button>       

        <RouterButtons filter={filter} onChangeView={this.changeView} />
        {filter === 'addCandidate' && <CandidateForm />}
        {filter === 'showCandidates' &&
          <ShowCandidates
            searchQuery={searchQuery}
            onSearch={this.handleSearch}
            onFilterAll={this.filterAllCandidates}
            onFilterLecture={this.filterLectureCandidates}
            onFilterWorkshop={(event) => this.filterWorkshopCandidates(event)}
            onDecisionChange={this.handleDecisionChange}
            filteredCandidates={filteredCandidates}
            allCandidates={candidates}
            workshopFilter={workshopFilter}
          />}
      </div>
    );
  }
};

export default App;