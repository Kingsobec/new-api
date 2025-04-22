package setting

var ServerAddress = "https://71c4-197-210-79-131.ngrok-free.app"
var WorkerUrl = ""
var WorkerValidKey = ""

func EnableWorker() bool {
	return WorkerUrl != ""
}
