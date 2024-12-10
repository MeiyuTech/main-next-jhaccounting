"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { PURPOSE_OPTIONS } from "../constants"
import { FormData } from "../types"
import { useMemo } from "react"
import { Country, State } from 'country-state-city'
import { COUNTRIES, getRegionLabel } from "../constants"

export function ClientInfo() {
  const form = useFormContext<FormData>()
  const countries = useMemo(() =>
    Country.getAllCountries().map(country => ({
      value: country.isoCode,
      label: country.name
    }))
    , [])

  // Get selected country
  const selectedCountry = form.watch("country")

  // Get region type based on selected country
  const regionConfig = useMemo(() => {
    if (!selectedCountry) {
      return { label: "地区", options: [] }
    }
    const states = State.getStatesOfCountry(selectedCountry)
    const regionLabels: Record<string, string> = {
      US: "州",
      CN: "省",
      // 可以添加更多国家的翻译
    }

    return {
      label: regionLabels[selectedCountry] || "地区",
      options: states.map(state => ({
        value: state.isoCode,
        label: state.name
      }))
    }
  }, [selectedCountry])

  const country = form.watch('country')
  const regionLabel = getRegionLabel(country)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">客户信息</h2>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="firmName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>公司/个人名称</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>国家</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="选择国家" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
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

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                街道地址
              </FormLabel>
              <FormControl>
                <Input placeholder="1234 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetAddress2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                街道地址 2
                <span className="text-sm text-gray-500 ml-2">(可选)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Apartment, suite, unit, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>城市</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{regionLabel.label}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={`选择${regionLabel}`} />
                </SelectTrigger>
                <SelectContent>
                  {regionConfig.options.map((option) => (
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮编</FormLabel>
              <FormControl>
                <Input placeholder="12345" maxLength={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                传真号码
                <span className="text-sm text-gray-500 ml-2">(可选)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="123-456-7890"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    if (value.length <= 10) {
                      const formatted = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
                      field.onChange(formatted)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>电话号码</FormLabel>
              <FormControl>
                <Input
                  placeholder="123-456-7890"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    if (value.length <= 10) {
                      const formatted = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
                      field.onChange(formatted)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>电子邮箱</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="purpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>评估目的</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="选择评估目的" />
              </SelectTrigger>
              <SelectContent>
                {PURPOSE_OPTIONS.map((option) => (
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

      {form.watch("purpose") === "other" && (
        <FormField
          control={form.control}
          name="purposeOther"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="请说明其他评估目的" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
