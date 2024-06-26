import "./styles.css";
import axios from "axios";
import Layout from "@theme/Layout";
import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  Card,
  Typography,
  Input,
  Select,
  message,
  Badge,
  Modal,
  Descriptions,
} from "antd";

const { Paragraph, Text } = Typography;
const { Search } = Input;
const { Ribbon } = Badge;

const class2colorStr = (class_) => {
  const colorMap = {
    建筑: "cyan",
    装备: "purple",
    物品: "volcano",
    自然: "green",
  };
  return colorMap[class_] || "gray";
};

export default function McIDPage() {
  const [mIsLoading, set_mIsLoading] = useState(false); // 是否正在加载

  const [mVersionList, set_mVersionList] = useState([]); // 版本列表数据
  const [mItemList, set_mItemList] = useState([]); // 物品列表数据

  const [mSearchInputData, set_mSearchInputData] = useState(""); // 搜索框输入数据
  const [mSelectedClass, set_mSelectedClass] = useState("all"); // 选择的分类
  const [mSelectedVersion, set_mSelectedVersion] = useState(""); // 选择的版本

  const [mInputSelectedKey, set_mInputSelectedKey] = useState("name"); // 输入框选中的key

  const [mFilterShowData, set_mFilterShowData] = useState([]); // 过滤后的展示数据

  useEffect(() => {
    const fetchData = async () => {
      set_mIsLoading(true);
      if (mVersionList.length === 0) {
        const verData = await axios(
          "https://api.github.com/repos/engsr6982/Minecraft-ItemList/tags"
        );
        if (verData.status !== 200) return message.error("获取版本列表失败！");
        set_mVersionList(verData.data.map((item) => item.name)); // 获取版本列表
        set_mSelectedVersion(verData.data[0].name); // 默认选择第一个版本
      }
      if (mSelectedVersion === "") return message.error("请选择版本！");
      const itData = await axios(
        // `https://raw.githubusercontent.com/engsr6982/Minecraft-ItemList/${mSelectedVersion}/Item.json`
        `https://cdn.jsdelivr.net/gh/engsr6982/Minecraft-ItemList@${mSelectedVersion}/Item.json`
      );
      if (itData.status !== 200) return message.error("获取物品列表失败！");
      set_mItemList(itData.data);
      set_mIsLoading(false);
    };
    fetchData();
  }, [mSelectedVersion, mVersionList]);

  useEffect(() => {
    set_mIsLoading(true);
    let results = mItemList;
    if (mSearchInputData !== "") {
      results = results.filter(
        (it) =>
          mInputSelectedKey !== "id"
            ? it[mInputSelectedKey] // 名称或命名空间
                .toLowerCase()
                .includes(mSearchInputData.toLowerCase())
            : it[mInputSelectedKey] === parseInt(mSearchInputData) // ID
      );
    }
    if (mSelectedClass !== "all") {
      results = results.filter((item) => item.class === mSelectedClass); // 分类过滤
    }
    set_mFilterShowData(results);
    set_mIsLoading(false);
  }, [mSearchInputData, mInputSelectedKey, mSelectedClass, mItemList]);

  return (
    <Layout title="McID" description="Minecraft物品ID查询">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* 全局Div */}
      <div
        style={{
          padding: "20px",
          height: "calc(100vh - 60px)",
          borderRadius: "10px",
        }}
      >
        {/* 操作栏 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Search
            type="text"
            placeholder="搜索物品..."
            // value={mSearchInputData} // !不要设置value，否则会导致搜索框无法输入
            disabled={mIsLoading} // 加载中禁用
            loading={mIsLoading} // 加载中显示
            addonBefore={
              <Select
                defaultValue={"name"}
                disabled={mIsLoading} // 加载中禁用
                options={[
                  { value: "name", label: "Name" },
                  { value: "type", label: "Type" },
                  { value: "id", label: "ID" },
                ]}
                onChange={set_mInputSelectedKey}
              />
            }
            onChange={(e) => set_mSearchInputData(e.target.value)}
            onSearch={(value) => set_mSearchInputData(value)}
            style={{ width: "100%" }}
          />
          {/* 类别下拉框 */}
          <Select
            style={{ width: "80px", margin: "0 4px" }}
            defaultValue="all"
            disabled={mIsLoading} // 加载中禁用
            onChange={set_mSelectedClass}
            options={[
              { value: "all", label: "所有" },
              ...Array.from(new Set(mItemList.map((item) => item.class))).map(
                (cl) => {
                  return { value: cl, label: cl };
                }
              ),
            ]}
          />
          {/* 版本下拉框 */}
          <Select
            style={{ width: "98px" }}
            disabled={mIsLoading} // 加载中禁用
            defaultValue="default"
            onChange={set_mSelectedVersion}
            options={[
              ...Array.from(new Set(mVersionList)).map((v) => {
                if (v === mSelectedVersion)
                  return { value: "default", label: v }; // 默认选择第一个版本
                return { value: v, label: v };
              }),
            ]}
          />
        </div>

        {/* 卡片展示区 */}
        <div
          style={{
            height: "calc(100vh - 135px)",
            width: "calc(100% - 1px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <List
            // rowKey="id"
            bordered={true}
            loading={mIsLoading}
            pagination={{
              position: "both",
              align: "end",
            }}
            grid={{
              gutter: 0,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            style={{
              height: "98%",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            dataSource={mFilterShowData}
            renderItem={(mItem) => {
              return (
                <List.Item
                  key={mItem.id}
                  styles={{ width: "100%", height: "201px" }}
                >
                  <Ribbon
                    text={mItem.class}
                    color={class2colorStr(mItem.class)}
                    style={{ zIndex: 1 }}
                  >
                    <Card
                      className="custom-card-padding"
                      hoverable={true}
                      actions={[
                        <a
                          key="copy"
                          onClick={() =>
                            navigator.clipboard.writeText(JSON.stringify(mItem))
                          }
                        >
                          复制JSON
                        </a>,
                        <a
                          key="view"
                          onClick={() =>
                            Modal.info({
                              mask: true,
                              okText: "关闭",
                              title: `${mItem.name} 的详细信息`,
                              content: (
                                <>
                                  <Descriptions
                                    size="small"
                                    bordered={true}
                                    layout="vertical"
                                    items={[
                                      {
                                        key: "name",
                                        label: "名称",
                                        children: (
                                          <Text copyable={true}>
                                            {mItem.name}
                                          </Text>
                                        ),
                                      },
                                      {
                                        key: "type",
                                        label: "命名空间",
                                        children: (
                                          <Text copyable={true}>
                                            {mItem.type}
                                          </Text>
                                        ),
                                      },
                                      {
                                        key: "id",
                                        label: "别名ID",
                                        children: (
                                          <Text copyable={true}>
                                            {String(mItem.id)}
                                          </Text>
                                        ),
                                      },
                                      {
                                        key: "aux",
                                        label: "特殊值",
                                        children: (
                                          <Text copyable={true}>
                                            {mItem.aux}
                                          </Text>
                                        ),
                                      },
                                      {
                                        key: "class",
                                        label: "分类",
                                        children: (
                                          <Text copyable={true}>
                                            {mItem.class}
                                          </Text>
                                        ),
                                      },
                                      {
                                        key: "icon",
                                        label: "图标",
                                        children: (
                                          <Text copyable={true}>
                                            {String(mItem.icon)}
                                          </Text>
                                        ),
                                      },
                                    ]}
                                  />
                                </>
                              ),
                            })
                          }
                        >
                          查看详情
                        </a>,
                      ]}
                    >
                      <Card.Meta
                        avatar={
                          <img
                            loading="lazy"
                            src="" // TODO: 加载物品图标
                            style={{
                              width: "48px",
                              height: "48px",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADk0lEQVR4nO2Y3U/TYBTGFxP9J/RWL7zFFW646ZagiciCfJj4N8C1XnkL0g0QNkU0DuRmwTnTYmZYxxQIbDEQMOnGGENgjPkFjn3csMgxb7cBXdt1ny0kO8mTLG3f5Pm1z3nfk6lUtapVrWpVq0pXj2v1GuHwThIOJkbQXlBUDuSBsfZOM9cLNt9He/cVN05zhTzpaf9VSQD2zZ8Dw4SwLAUAnIPY0GJiotIAipv05lUNgKjwG9U7fTC2HAGbP8bKvBxhr12YL2BejgAVTHKErl0YAJs/xgOwrceUARj8vM7qQgIYnD4Yce+wMsyslRWhsSUFImRa+A4vPSFWpoWtgtfpnT4WQtEmHpwNnJjP6tmXjar0jKrSAIYZH4x4dngAxUaJUATA6YXnC1s881mhe+caYGh2Q9T8SZTmhKM06gnBK8+OcgAoHiMS5tNRCoFhxs9Za5wLArmRADKYANP8pgIAKDqL25Lms3qxuA36zNoBl5/d58/u+QMuv7wAQ3PBgs1nNTwbBD3tAwuzz9v3J5mDvFtnRQH6Xf6izbNyh2Bi9RfPPJURuld1APSWUBxKAchnnsqokKYuC8A4X3x0kMxLEbZhxYx/XI+Cx0JB8PEj2OvUwd/bjax2O1pgpbsbbMNm6J/+Vh4AarRSzL/+GoYPgbioefekHX536iChwfJqr+0uWE3jpQGw0XEXH51Rzy5Y16KCxqcCcfD1EpLGcxXXqPvgiepSUQDG+dNBrRhZmAPRN1+K+cQpRG9JPVApWY3jPFPJ1iZIaBv4hrUN6Xu5z+OYThEA1IwozxwzD5rhXzgEKTvFhdDWQ4q0wvHPCCQfcvskjqs3of3mFdkBbENvuObvN8FxJAzZStnJNIS2gf2dLfQMepYLgbXLDrDS1ZUTkXo4It+dGE1DUJCi3udcy4CdXYtjE7IDhNuaBXJez4OQNJ/WGg+gj2YOqwkQvdMovLtohSF4fcGROi7wBRirUgApysoH+DQlDoCrD/kADu8Ngmb+VC1C7feEzZN885JfAcd8glsp+h8e/ZVdjTih2UbKfMpOwlHO1xCBeKuSu+JadUelttEYjrXJDgB1dZcTGnVA+CAjeQcZauzjH0IHGRYUPMjkqJj2VmvZo4QGa1EpWWiqTJQ8zGE9KqULjcRxXP20lEk07zgtdyVxTJfbEyKHVkDx2IgVamw0mKHZBu3t6IRlhX7j2ATabdAzQov/A+VQ83mEsVV5AAAAAElFTkSuQmCC";
                            }}
                          />
                        }
                        title={<a>{mItem.name}</a>}
                        description={
                          <Paragraph style={{ margin: 0 }}>
                            <Text type="secondary" ellipsis={true}>
                              Type:
                              <Text> {mItem.type}</Text>
                            </Text>
                            <br />
                            <Text type="secondary" ellipsis={true}>
                              ID:
                              <Text> {String(mItem.id)}</Text>
                            </Text>
                            <br />
                            <Text type="secondary" ellipsis={true}>
                              Aux:
                              <Text> {String(mItem.aux)}</Text>
                            </Text>
                            <br />
                            <Text type="secondary" ellipsis={true}>
                              Icon:
                              <Text> {String(mItem.icon)}</Text>
                            </Text>
                          </Paragraph>
                        }
                      />
                    </Card>
                  </Ribbon>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
