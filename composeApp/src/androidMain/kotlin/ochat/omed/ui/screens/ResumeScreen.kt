package ochat.omed.ui.screens

import android.annotation.SuppressLint
import android.util.Log
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import ochat.omed.R
import ochat.omed.ui.theme.MyPillDealerTheme
import java.time.LocalTime

val colors = listOf(
    Color(0xFFF197C0),
    Color(0xFFFEC9A7),
    Color(0xFFA5F8CE),
    Color(0xFFFEFD97),
    Color(0xFFC5EBFE),
    Color(0xFFB49FDC),

    Color(0xFFFFD3E0),
    Color(0xFFFFF5C3),
    Color(0xFFB8E6C1),
    Color(0xFFC6D8FF)
)

enum class IllnessType(val icon: Int) {
    HEART_RELATED(R.drawable.heart),
    DIGESTIVE(R.drawable.digestive),
    GENERAL_BODY(R.drawable.body),
    BRAIN_RELATED(R.drawable.brain),
    PSYCHOLOGICAL(R.drawable.psychological)
}


enum class PillType(val icon: Int){
    PILL(R.drawable.pill),
    TABLET(R.drawable.tablet),
    INHALER(R.drawable.inhaler)
}

enum class TimeArea(
    val startTime: LocalTime,
    val endTime: LocalTime
) {
    JUSTAWAKE(LocalTime.of(6, 0), LocalTime.of(7, 0)),  // Right after waking up
    BEFOREBREAKFAST(LocalTime.of(7, 0), LocalTime.of(8, 0)), // Before breakfast
    AFTERBREAKFAST(LocalTime.of(8, 0), LocalTime.of(10, 30)), // After breakfast
    MIDDAY(LocalTime.of(10, 30), LocalTime.of(12, 30)), // Mid-morning
    BEFORELUNCH(LocalTime.of(12, 30), LocalTime.of(13, 30)), // Before lunch
    AFTERLUNCH(LocalTime.of(13, 30), LocalTime.of(15, 30)), // After lunch
    MIDAFTERNOON(LocalTime.of(15, 30), LocalTime.of(17, 30)), // Mid-afternoon
    BEFOREDINNER(LocalTime.of(17, 30), LocalTime.of(19, 30)), // Before dinner
    AFTERDINNER(LocalTime.of(19, 30), LocalTime.of(21, 30)), // After dinner
    PREVIOUSTOSLEEP(LocalTime.of(21, 30), LocalTime.of(23, 59)),// Before going to sleep
    DEFAULT(LocalTime.of(0,0), LocalTime.of(0,0))
}

data class Pill(
    val name: String,
    val timesXDay: Int,
    val totalTimes: Int,
    val pillType: PillType,
    val illnessType: IllnessType
)

data class PillGroup(
    val timeArea: TimeArea,
    val pills: List<Pill>?,
    val color: Color
)

val pills = listOf(
    Pill("Paracetamol", 3, 60, PillType.PILL, IllnessType.DIGESTIVE),
    Pill("Ibuprofeno", 3, 60, PillType.TABLET, IllnessType.BRAIN_RELATED),
    Pill("Omeprazol", 1, 15, PillType.INHALER, IllnessType.PSYCHOLOGICAL),
    Pill("Nose", 3, 30, PillType.INHALER, IllnessType.GENERAL_BODY),
    Pill("Rambutan", 1, 90, PillType.PILL, IllnessType.HEART_RELATED),
    Pill("Terminal", 1, 0, PillType.TABLET, IllnessType.BRAIN_RELATED)
)

val pillGroups = listOf(
    PillGroup(TimeArea.JUSTAWAKE, pills.shuffled(), colors[0]),
    PillGroup(TimeArea.BEFOREBREAKFAST, pills.shuffled(), colors[1]),
    PillGroup(TimeArea.AFTERBREAKFAST, pills.shuffled(), colors[2]),
    PillGroup(TimeArea.MIDDAY, pills.shuffled(), colors[3]),
    PillGroup(TimeArea.BEFORELUNCH, pills.shuffled(), colors[4]),
    PillGroup(TimeArea.AFTERLUNCH, pills.shuffled(), colors[5]),
    PillGroup(TimeArea.MIDAFTERNOON, pills.shuffled(), colors[6]),
    PillGroup(TimeArea.BEFOREDINNER, pills.shuffled(), colors[7]),
    PillGroup(TimeArea.AFTERDINNER, pills.shuffled(), colors[8]),
    PillGroup(TimeArea.PREVIOUSTOSLEEP, pills.shuffled(), colors[9]),
)



@Preview
@Composable
fun ResumePreview(){
    MyPillDealerTheme {
        ResumeScreen()
    }
}


fun getCurrentTimeArea(): TimeArea {
    val currentTime = LocalTime.now()

    return TimeArea.entries.find { area ->
        currentTime.isAfter(area.startTime) && currentTime.isBefore(area.endTime)
    }?: TimeArea.DEFAULT
}

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@Composable
fun ResumeScreen() {

    val thisTimeArea = getCurrentTimeArea()

    val listState = rememberLazyListState()
    val startIndex = pillGroups.indexOfFirst { it.timeArea == thisTimeArea }.takeIf { it >= 0 } ?: 0

    LaunchedEffect(Unit) {
        Log.d("q", startIndex.toString())
        delay(300)
        listState.scrollToItem(startIndex)
    }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        containerColor = Color.White,
    ) {

        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 16.dp, bottom = 16.dp, start = 16.dp, end = 16.dp),
            contentAlignment = Alignment.Center
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
            )
            {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                ){
                    Text(
                        text = "My Pill Box",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,

                        modifier = Modifier
                            .padding(bottom = 8.dp)
                    )
                }
                LazyColumn(
                    state = listState,
                    modifier = Modifier
                        .fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(0.dp, Alignment.Top)
                ) {
                    itemsIndexed(pillGroups) { _, group ->
                        if (!group.pills.isNullOrEmpty()) {
                            Box(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .padding( horizontal = if (group.timeArea != thisTimeArea) 16.dp else 0.dp, vertical = 8.dp)
                            ){
                                PillGroupCard(group)
                                Spacer(modifier = Modifier.size(8.dp))
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun PillGroupCard(group: PillGroup){
    ElevatedCard(
        modifier = Modifier
            .fillMaxWidth()
            .border(1.5.dp, Color.Black, RoundedCornerShape(12.dp)),
        colors = CardDefaults.elevatedCardColors(
            containerColor = group.color
        ),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                modifier = Modifier
            ) {
                Text(
                    text = group.timeArea.name,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            LazyRow(
                modifier = Modifier
                    .fillMaxSize(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                itemsIndexed(group.pills!!) { index, pill ->
                Box(
                    modifier = Modifier
                        .size(width = 150.dp, height = 150.dp)
                )
                {
                    PillCard(pill)
                }
                }
            }
        }

    }
}

@Composable
fun PillCard(pill: Pill){
    ElevatedCard(
        modifier = Modifier
            .fillMaxSize()
            .border(1.5.dp, Color.Black, RoundedCornerShape(8.dp)),
        elevation = CardDefaults.elevatedCardElevation(defaultElevation = 4.dp),
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(8.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Icon(
                modifier = Modifier
                    .size(32.dp)
                    .align(Alignment.Start),
                painter = painterResource(pill.illnessType.icon),
                contentDescription = "Illness type icon",
                tint = Color.Unspecified,
            )

            Icon(
                modifier = Modifier
                    .size(64.dp),
                painter = painterResource(pill.pillType.icon),
                contentDescription = "Pill type icon",
                tint = Color.Unspecified
            )

            Text(
                text = pill.name,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}