package setting

var ServerAddress = "http://localhost:4000"
var WorkerUrl = ""
var WorkerValidKey = ""

func EnableWorker() bool {
	return WorkerUrl != ""
}
