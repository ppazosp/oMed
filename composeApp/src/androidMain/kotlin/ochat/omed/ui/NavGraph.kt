package ochat.omed.ui

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch
import ochat.omed.ui.screens.CameraScreen
import ochat.omed.ui.screens.ChatbotScreen
import ochat.omed.ui.screens.ResumeScreen
import ochat.omed.ui.screens.Screens

@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun NavGraph() {
    val screens = listOf(Screens.Chatbot, Screens.Resume, Screens.Camera)
    val pagerState = rememberPagerState(
        initialPage = 1,
        pageCount = { screens.size }
    )
    val coroutineScope = rememberCoroutineScope()

    var currentPage by remember { mutableIntStateOf(0) }

    LaunchedEffect(pagerState.currentPage) {
        currentPage = pagerState.currentPage
    }

    Scaffold(
        bottomBar = {
            BottomNavigationBar(
                selectedIndex = currentPage,
                onItemSelected = { page ->
                    coroutineScope.launch {
                        pagerState.animateScrollToPage(page)
                    }
                }
            )
        }
    ) { innerpadding ->
        HorizontalPager(
            state = pagerState,
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 32.dp, bottom = 56.dp)
        ) { page ->
            when (screens[page]) {
                Screens.Chatbot -> ChatbotScreen()
                Screens.Resume -> ResumeScreen()
                Screens.Camera -> CameraScreen()
            }
        }
    }
}