const endPointNotFound = (req, res) => {
  // TO DO: return 404 and not found message 
  return res.status(404).json({"error": "Not Found"});
};

module.exports = {
  endPointNotFound,
};
