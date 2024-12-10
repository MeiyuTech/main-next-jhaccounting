"use client"

import dayjs from "dayjs"
import { Plus, Trash2 } from "lucide-react"
import { useCallback, useMemo } from "react"
import countryList from 'react-select-country-list'
import { useFormContext, useFieldArray } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { TITLE_OPTIONS, MONTH_OPTIONS, YEAR_OPTIONS } from "../constants"
import { FormData } from "../types"


function EducationFields({ index, onRemove }: { index: number, onRemove?: () => void }) {
  const form = useFormContext<FormData>()
  const countries = useMemo(() => countryList().getData(), [])

  return (
    <div className="space-y-4 p-4 border rounded-lg relative">
      {index > 0 && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      {/* School and Country in one row */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`educations.${index}.schoolName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full school name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`educations.${index}.countryOfStudy`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study Country</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Degree in its own row */}
      <FormField
        control={form.control}
        name={`educations.${index}.degreeObtained`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree Obtained</FormLabel>
            <FormControl>
              <Input placeholder="e.g.: Bachelor of Science" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Study Period */}
      <div className="space-y-2">
        <FormLabel>Study Period</FormLabel>
        <div className="grid grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-2">
            <FormLabel className="text-sm text-gray-500">Start Date</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name={`educations.${index}.studyDuration.startDate.month`}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTH_OPTIONS.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`educations.${index}.studyDuration.startDate.year`}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEAR_OPTIONS.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <FormLabel className="text-sm text-gray-500">End Date</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name={`educations.${index}.studyDuration.endDate.month`}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTH_OPTIONS.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`educations.${index}.studyDuration.endDate.year`}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEAR_OPTIONS.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EvalueeInfo() {
  const form = useFormContext<FormData>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations"
  })

  const birthMonth = form.watch("dateOfBirth.month")
  const birthYear = form.watch("dateOfBirth.year")

  // Calculate days in month
  const daysInMonth = birthMonth && birthYear
    ? dayjs(`${birthYear}-${birthMonth}`).daysInMonth()
    : 31

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Evaluee Information</h2>

      {/* Basic Information */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>称谓</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="选择称谓" />
                </SelectTrigger>
                <SelectContent>
                  {TITLE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  中间名
                  <span className="text-sm text-gray-500 ml-2">(可选)</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <FormLabel>出生日期</FormLabel>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="dateOfBirth.month"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="月" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTH_OPTIONS.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth.date"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!birthMonth}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="日" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = String(i + 1).padStart(2, '0')
                        return (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth.year"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="年" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEAR_OPTIONS.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Education Information */}
      <div className="space-y-4 pt-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Education Information</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({
              countryOfStudy: "",
              degreeObtained: "",
              schoolName: "",
              studyDuration: {
                startDate: { month: "", year: "" },
                endDate: { month: "", year: "" }
              }
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <EducationFields
              key={field.id}
              index={index}
              onRemove={index > 0 ? () => remove(index) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
