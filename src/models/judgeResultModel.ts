/**
 * @FileName: judgeResultModel
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/16 17:41
 */

export interface JudgeResultModel {
  extraInfo: [],
  judgeEndTime: number,
  judgeResults: JudgeResultItem[],
  submissionId: string
}

export interface JudgeResultItem {
  message: "ACCEPT" | "COMPILE_ERROR" | "RUNTIME_ERROR" | "PENDING",
  condition: number,
  stdInPath: string,
  memoryCost: number,
  stdErrPath: string,
  stdOutPath: string,
  cpuTimeCost: number,
  realTimeCost: number
}
