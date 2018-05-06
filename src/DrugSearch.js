import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class DrugSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleOnNewRequest = this.handleOnNewRequest.bind(this);
  }

  handleUpdateInput(value){
    this.setState({
      dataSource: [
        'Lisinopril','Exemestane','Lithane','Lisdexmfetamine','Dimesylate',
        "Lexxel", "Librium","Lidex","Lidoderm",
    "Linezolid",
    "Lipofen",
    "Liposyn II",
    "Liraglutide",
    "Lisinopril and Hydrochlorothiazide",
    "Locoid",
    "Lodine",
    "Loperamide Hcl",
    "Lopid",
    "Loprox Gel",
    "Loracarbef",
      ],
    });
  }

  handleOnNewRequest(){
    this.props.metaOnNewRequest();
  }

  render() {
    return (
      <div>
        <AutoComplete
          hintText="Type anything"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleOnNewRequest}
          floatingLabelText="Search Rx"
          fullWidth={true}
        />
      </div>
    );
  }
}
export default DrugSearch;