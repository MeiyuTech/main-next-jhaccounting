import * as z from "zod"
import { formSchema } from "./schema"

export enum FormStep {
  CLIENT_INFO = 0,        // 客户信息
  EVALUEE_INFO = 1,       // 待评估人员信息
  SERVICE_SELECTION = 2,  // 服务选择
  REVIEW = 3,            // 确认信息
}

export type FormData = z.infer<typeof formSchema>
