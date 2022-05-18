var express = require("express");
var router = express.Router();
const Jobs = require("../models/jobs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "connectToIndia247" });
});

// route for apply form that will carry the data from list of jobs
router.get("/apply", function (req, res, next) {
  res.render("apply", { title: "connect2India247" });
});

// route for jobs lists from the database
router.get("/jobs", async function (req, res, next) {
  var data = await Jobs.find().limit(10);
  console.log("from data:", data);
  res.render("jobs", {
    title: "connect2India247",
    data: data.reverse(),
    status: undefined,
  });
});

// route for adding a specific job
router.post("/add/job", async function (req, res, next) {
  console.log(req.body, "inserting a document");
  var job = new Jobs({ ...req.body });
  await job.save((err, result) => {
    if (err) {
      res.render("admin/addJobs", {
        title: "Unable added the job ",
        status: false,
      });
    } else {
      res.render("admin/addJobs", {
        title: "Succesfully added the job ",
        status: true,
      });
    }
  });

  // res.render("admin/addJobs", { title: "" });
});
// route for adding a specific job
router.get("/add/job", function (req, res, next) {
  res.render("admin/addJobs", { title: "", status: undefined });
});

// for seeing the existing all the jobs
router.get("/list/job", async function (req, res, next) {
  var data = await Jobs.find();
  res.render("admin/listJobs", {
    title: "connect2India247",
    data: data.reverse(),
    status: undefined,
  });
});

//for deleting a specific job
router.get("/job/delete/:uid", async function (req, res, next) {
  console.log("Request Id", req.params.uid);
  await Jobs.findByIdAndDelete({ _id: req.params.uid }, async (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(200).send("some error happend while trying this");
    } else {
      var data = await Jobs.find();
      console.log("from data:", data);
      res.render("admin/listJobs", {
        title: "connect2India247",
        status: true,
        data: data.reverse(),
      });
    }
  });
});

// route for seeing a specific job
router.get("/job/detail/:uid", async function (req, res, next) {
  console.log("Request Id", req.params.uid);
  var data = await Jobs.findById({ _id: req.params.uid }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(200).send(err);
    } else {
      console.log(docs);
      return res.render("job", { title: "connect2India247", data: docs });
    }
  });
  console.log("from data:", data);
  // res.render("job", { title: "connect2India247", data: data });
});

module.exports = router;
