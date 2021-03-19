import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import VueTree from './VueTree'

class KpiTree extends Component {

  constructor(props) {
    super(props)

    this.container = React.createRef()
    
    this.state = {
      treeW: 1200,
      treeH: 800,
      treeConfig: { 
          nodeWidth: 240,
          nodeHeight: 100, 
          levelHeight: 100 
      },
      tree: {
        name: "EDITDA", 
        value: {amount: "123", color: "green"}, 
        delta: {amount:"12%", color: "green"}, 
        children: [
          {
            name: "Customer Profitability",
            value: {amount: "123", color: "green"}, 
            delta: {amount: "12%", color: "red"}, 
            children: [
              {
                name: "MRR", 
                value: {amount: "123", color: "orange"}, 
                delta: {amount: "12%", color: "green"}, 
                children: [
                  {
                    name: "ACV",
                    value: {amount: "123", color: "orange"}, 
                    delta: {amount: "12%", color: "red"}, 
                  }
                ]
              },
              {
                name: "Total CAC",
                value: {amount: "123", color: "green"}, 
                delta: {amount: "12%", color: "green"}, 
                children: [
                  {
                    name: "Customer Success",
                    value: {amount: "123", color: "red"}, 
                    delta: {amount: "12%", color: "green"},
                  },
                  {
                    name: "Sales & Marketing",
                    value: {amount: "123", color: "green"}, 
                    delta: {amount: "12%", color: "green"},
                  }
                ],
              }
            ]
          },{ 
            name: "EDITDA", 
            value: {amount: "123", color: "green"}, 
            delta: {amount:"12%", color: "green"}, 
          },
          {
            name: "NON-CAC related",
            value: {amount: "123", color: "green"}, 
            delta: {amount:"12%", color: "orange"},
            children: [
              {
                name: "R&D (excl. Support)",
                value: {amount: "123", color: "green"}, 
                delta: {amount: "12%", color: "green"},                      
              },
              {
                name: "G&A",
                value: {amount: "123", color: "green"}, 
                delta: {amount: "12%", color: "green"},  
              }
            ]                 
          }
        ]
      }
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  resizeHandler () {
    this.treeW = this.container.current.clientWidth
    this.treeH = this.container.current.clientHeight

    this.treeRef.setTransform(this.treeW, this.treeH)
  }

  onClickNode (index) {
    if( this.treeRef )
      this.treeRef.onClickNode(index)
  }

  zoomIn () {
    this.treeRef.zoomIn()
  }

  zoomOut () {
    this.treeRef.zoomOut()
  }

  zoomReset () {
    this.treeRef.restoreScale()
  }

  render() {
    const { tree, treeConfig, treeW, treeH } = this.state

      return (         
        <div>
          <h1>{ this.props.msg }</h1>
          <div className="tree-container" ref={this.container}>
          <VueTree 
                onRef={ref => (this.treeRef = ref)}
                style={{width: treeW + 'px', height: treeH + 'px'}}
                dataset={tree}
                config={treeConfig}
                linkStyle="straight"
                onClickNode={this.onClickNode} >
            </VueTree>

            <div className="tree-toolbar">
                <div className="btn-toolbar" onClick={this.zoomIn}><FontAwesome name="plus" /></div>
                <div className="btn-toolbar" onClick={this.zoomReset}><FontAwesome name="retweet" /></div>
                <div className="btn-toolbar" onClick={this.zoomOut}><FontAwesome name="minus" /></div>
            </div>
          </div>
        </div>
      );
  }
}

export default KpiTree;
