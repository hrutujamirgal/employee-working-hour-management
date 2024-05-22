import React from 'react'

const AssignProject = () => {
  return (
    
    <div>
      <div className="h1">
        <h1>Assign Project</h1>
      </div>
    
    <div className="container mt-5">
        {/* <form> */}
            <div className="form-group">
                <label for="recipientEmail">To:</label>
                <input type="text" className="form-control" id="recipientEmail" placeholder="Email of the Recipient"/>
            </div>
            <div className="form-group">
                <label for="projectName">Project:</label>
                <input type="text" className="form-control" id="projectName" placeholder="Project to Assign"/>
            </div>
            <div className="form-group">
                <label for="description">Description:</label>
                <textarea className="form-control" id="description" rows="4"
                    placeholder="Enter project description"></textarea>
            </div>
            <div className="form-check">
                <label className="edit">Transferred Project: </label>
                <input type="radio" name="transfer"/>
                <label for="Yes">Yes</label>
                <input type="radio" name="transfer"/>
                <label for="No">No</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        {/* </form> */}
    </div>
    </div>
  )
}

export default AssignProject
