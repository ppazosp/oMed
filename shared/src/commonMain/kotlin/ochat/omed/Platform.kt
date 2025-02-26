package ochat.omed

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform