import React from "react";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/store-hooks";
import { Member } from "./Member";
import { SiteMember } from "../types/Admin";

export const MemberList = () => {
    const { siteMembers } = useAppSelector((state: RootState) => state.admin);

    return (
        <>
            <section className="container px-4 mx-auto">
                <div className="mt-6 flex items-center justify-between"></div>
                <div className="flex-col mt-6">
                    <div className="overflow-hidden border border-gray-200  rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-orange-100 ">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-2 sm:px-12 w-2/6 sm:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        ユーザー
                                    </th>

                                    <th
                                        scope="col"
                                        className="py-2 sm:px-4 w-2/6 sm:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        メールアドレス
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-2 sm:px-4 w-1/6 sm:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        権限
                                    </th>

                                    <th
                                        scope="col"
                                        className="py-2 sm:px-4 w-1/6 sm:py-3.5 text-sm font-normal text-center text-gray-500"
                                    >
                                        削除
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {siteMembers?.map((siteMember: SiteMember) => {
                                    return (
                                        <Member
                                            key={siteMember.siteMemberId}
                                            {...siteMember}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};
